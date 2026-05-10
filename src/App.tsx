import "./App.css";

import { Routes, Route } from "react-router-dom";
import { HomeView } from "./views/HomeView";
import { GameView } from "./views/GameView";
import { EditGameView } from "./views/EditGameView";
import { TagsView } from "./views/TagsView";
import { EditTagView } from "./views/EditTagView";
import { PlayGameView } from "./views/PlayGameView";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/game/:id/play" element={<PlayGameView />} />
        <Route path="/game/:id" element={<GameView />} />
        <Route path="/tags" element={<TagsView />} />
        <Route path="/game/:id/edit" element={<EditGameView />} />
        <Route path="/tags/:id/edit" element={<EditTagView />} />
      </Routes>
    </main>
  );
}
