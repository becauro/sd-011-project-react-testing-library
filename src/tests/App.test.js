import React from 'react';
import { screen } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Testa se renderiza a rota "/"', () => {
  renderWithRouter(<App />);

  const mainText = screen.getByText(/Encountered pokémons/i);
  expect(mainText).toBeInTheDocument();
});

test('Testa os links do topo', () => {
  renderWithRouter(<App />);

  const firstLink = screen.getByText(/Home/i);
  expect(firstLink).toBeInTheDocument();

  const secondLink = screen.getByText(/About/i);
  expect(secondLink).toBeInTheDocument();

  const thirdLink = screen.getByText(/Favorite Pokémons/i);
  expect(thirdLink).toBeInTheDocument();
});

test('Testa o redirecionamento na url "/" ao clicar em "Home"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkHome = getByText(/Home/);
  fireEvent.click(linkHome);
  const url = history.location.pathname;
  expect(url).toBe('/');
});

test('Testa se redireciona para a página de "About", na URL "/about"', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkAbout = getByText(/About/i);
  fireEvent.click(linkAbout);

  const urlAbout = history.location.pathname;
  expect(urlAbout).toBe('/about');

  const aboutPage = getByText(/About Pokédex/);
  expect(aboutPage).toBeInTheDocument();
});

test('Teste se redireciona página de `Pokémons Favoritados`, na URL `/favorites`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const linkFavorites = getByText(/Favorite pokémons/);
  fireEvent.click(linkFavorites);
  const url = history.location.pathname;
  expect(url).toBe('/favorites');
});
