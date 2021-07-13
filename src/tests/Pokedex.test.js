import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Componente <Pokedex />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { container } = renderWithRouter(<App />);
    const h2 = container.querySelector('h2');

    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon ao clicar em botão Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo Pokémon/i)).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const filterButton = getByText('All');

    expect(filterButton).toBeInTheDocument();
  });

  it('Teste se é criado um botão de filtro para cada tipo de Pokémon', () => {
    const { getByRole, getAllByTestId, getByText } = renderWithRouter(<App />);

    const pokemonTypeButton = getAllByTestId('pokemon-type-button');
    const pokemonTypes = 7;
    const allButton = getByText('All');

    const fire = getByRole('button', { name: 'Fire' });
    const electric = getByRole('button', { name: 'Electric' });
    const poison = getByRole('button', { name: 'Poison' });
    const psychic = getByRole('button', { name: 'Psychic' });
    const dragon = getByRole('button', { name: 'Dragon' });
    const normal = getByRole('button', { name: 'Normal' });
    const bug = getByRole('button', { name: 'Bug' });

    expect(pokemonTypeButton).toHaveLength(pokemonTypes);
    expect(allButton).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
  });
});
