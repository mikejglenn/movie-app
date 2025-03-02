import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { MovieForm } from './pages/MovieForm';
import { MovieList } from './pages/MovieList';
import { NotFound } from './pages/NotFound';
import './App.css';
import { AuthPage } from './pages/AuthPage';
import { UserProvider } from './components/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<MovieList />} />
          <Route path="details/:movieId" element={<MovieForm />} />
          <Route path="/sign-up" element={<AuthPage mode="sign-up" />} />
          <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}
