import { RatingValue } from "@/components/Rating";
import {
  BaseDirectory,
  readDir,
  mkdir,
  writeTextFile,
  writeFile,
  readTextFile,
  readFile,
  remove,
} from "@tauri-apps/plugin-fs";

export type GameMetadata = {
  id: string;
  title: string;
  description: string;
  tag_ids: string[];
  rating: RatingValue;
};

export type WithTags<T> = T & {
  tags: Tag[];
};

export type WithHash<T> = T & {
  hash: string;
};

export type Tag = {
  id: string;
  name: string;
  color: string; // CSS color string
};

const REPO = BaseDirectory.AppLocalData;

export async function setupRepo() {
  await mkdir("games", { baseDir: REPO, recursive: true });
  await mkdir("tags", { baseDir: REPO, recursive: true });
}

async function setupGameDir(gameId: string) {
  await mkdir(`games/${gameId}`, {
    baseDir: REPO,
    recursive: true,
  });
}

export function getGameScreenshotPath(gameId: string): string {
  return `games/${gameId}/screenshot.png`;
}

export async function getGameProgramBlob(gameId: string): Promise<Blob> {
  const buffer = await readFile(`games/${gameId}/program.swf`, {
    baseDir: REPO,
  });

  return new Blob([buffer], { type: "application/x-shockwave-flash" });
}

export async function getGameScreenshotBlob(gameId: string): Promise<Blob> {
  const buffer = await readFile(getGameScreenshotPath(gameId), {
    baseDir: REPO,
  });

  return new Blob([buffer], { type: "image/png" });
}

export async function writeGameMetadata(metadata: GameMetadata) {
  await setupGameDir(metadata.id);
  await writeTextFile(
    `games/${metadata.id}/metadata.json`,
    JSON.stringify(metadata),
    {
      baseDir: REPO,
    },
  );
}

async function hash(data: Uint8Array): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new Uint8Array(data),
  );
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function writeGameProgram(gameId: string, program: Uint8Array) {
  await setupGameDir(gameId);
  await writeFile(`games/${gameId}/program.swf`, program, {
    baseDir: REPO,
  });
  const programHash = await hash(program);
  await writeTextFile(`games/${gameId}/program.hash`, programHash, {
    baseDir: REPO,
  });
}

export async function writeGameScreenshot(
  gameId: string,
  screenshot: Uint8Array,
) {
  await setupGameDir(gameId);
  await writeFile(`games/${gameId}/screenshot.png`, screenshot, {
    baseDir: REPO,
  });
}

export async function getGameMetadata(id: string): Promise<GameMetadata> {
  const text = await readTextFile(`games/${id}/metadata.json`, {
    baseDir: REPO,
  });
  return JSON.parse(text);
}

export async function getTag(id: string): Promise<Tag> {
  const text = await readTextFile(`tags/${id}.json`, {
    baseDir: REPO,
  });
  return JSON.parse(text);
}

export async function withTags<T extends GameMetadata>(
  games: T[],
): Promise<WithTags<T>[]> {
  const tagCache: Record<string, Tag> = {};
  return Promise.all(
    games.map(async (game) => {
      const tags = await Promise.all(
        game.tag_ids.map(async (tagId) => {
          if (!tagCache[tagId]) {
            tagCache[tagId] = await getTag(tagId);
          }
          return tagCache[tagId];
        }),
      );
      return { ...game, tags };
    }),
  );
}

export async function withHash<T extends GameMetadata>(
  games: T[],
): Promise<WithHash<T>[]> {
  return Promise.all(
    games.map(async (game) => {
      const hash = await readTextFile(`games/${game.id}/program.hash`, {
        baseDir: REPO,
      });
      return { ...game, hash };
    }),
  );
}

export async function listGameMetadata(): Promise<GameMetadata[]> {
  return Promise.all(
    (await readDir("games", { baseDir: REPO })).map((entry) =>
      getGameMetadata(entry.name),
    ),
  );
}

export async function writeTag(tag: Tag) {
  await writeTextFile(`tags/${tag.id}.json`, JSON.stringify(tag), {
    baseDir: REPO,
  });
}

export async function deleteTag(tagId: string) {
  await remove(`tags/${tagId}.json`, {
    baseDir: REPO,
  });
}

export async function deleteGame(gameId: string) {
  await remove(`games/${gameId}`, {
    baseDir: REPO,
    recursive: true,
  });
}

export async function listTags(): Promise<Tag[]> {
  return Promise.all(
    (await readDir("tags", { baseDir: REPO })).map((entry) =>
      getTag(entry.name.replace(/\.json$/, "")),
    ),
  );
}
