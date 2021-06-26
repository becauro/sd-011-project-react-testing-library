import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test if Pokemon component is being exhibited correctly', () => {
  test('checks for pokemon info', () => {
    const { getByText, getByTestId, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const pokemonName = getByText('Pikachu');
    const pokemonType = getByTestId('pokemon-type').textContent;
    const pokemonWeight = getByText('Average weight: 6.0 kg');
    const imgAltText = 'Pikachu sprite';
    const imgPkmn = getByAltText(imgAltText);
    expect(imgPkmn
      && pokemonName
      && pokemonType
      && pokemonWeight
      && imgPkmn).toBeInTheDocument();
    const imageSrc = getByAltText(imgAltText);
    expect(pokemonType).toBe('Electric');
    expect(imageSrc.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('checks URL link on \'More Details\' ', () => {
    const { getByText } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/more details/i);
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('tests click on More Details ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const moreDetailsLink = getByText(/more details/i);
    fireEvent.click(moreDetailsLink);
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
  });

  test('checks if selected pokemon hast star', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    const moreDetails = getByText(/More Details/i);
    fireEvent.click(moreDetails);
    const favoritePokemon = getByText('Pokémon favoritado?');
    fireEvent.click(favoritePokemon);
    const imgUrl = '/star-icon.svg';
    const imageSrc = getByAltText('Pikachu is marked as favorite');
    expect(imageSrc.src).toContain(imgUrl);
  });
});
