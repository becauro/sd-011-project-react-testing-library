import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('A página About deve exibir infs sobre a Pokédex', () => {
  const { getByText } = render(<About />);
  const infoPokedex = getByText(/About Pokédex/i);
  expect(infoPokedex).toBeInTheDocument();
});

test('A paǵina deve conter um heading h2 com o texto About Pokédex', () => {
  const { queryByText, container } = render(<About />);
  const textAboutPokedex = queryByText('About Pokédex');
  expect(textAboutPokedex).toBeInTheDocument();
  expect(container.querySelector('h2')).toBeInTheDocument();
  expect(textAboutPokedex.tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
  const { container } = render(<About />);
  const paragraphs = container.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
});

test('A página deve conter a referida imagem de uma Pokédex', () => {
  const { getByRole } = render(<About />);
  const imgPokedex = getByRole('img');
  expect(imgPokedex).toBeInTheDocument();
  expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
