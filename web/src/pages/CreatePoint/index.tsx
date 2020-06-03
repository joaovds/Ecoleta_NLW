import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logo from '../../assets/logo.svg';

const CreatePoint = () => {
  return (
    <div id='page-create-point'>
      <header>
        <img src={logo} alt='Logo Ecoleta' />

        <Link to='/'>
          <FiArrowLeft />
          Voltar para a Home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className='field'>
            <label htmlFor='name'>Nome da entidade</label>
            <input type='text' name='name' id='name' />
          </div>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='email'>E-mail</label>
              <input type='email' name='email' id='email' />
            </div>
            <div className='field'>
              <label htmlFor='name'>Whatsapp</label>
              <input type='text' name='whatsapp' id='whatsapp' />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <div className='field-group'>
            <div className='field'>
              <label htmlFor='uf'>Estado</label>

              <select name='uf' id='uf'>
                <option value='SP'>Selecione uma UF</option>
              </select>
            </div>

            <div className='field'>
              <label htmlFor='city'>Cidade</label>

              <select name='city' id='city'>
                <option value='Peruba'>Selecione uma </option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className='items-grid'>
            <li>
              <img
                src='http://localhost:3333/uploads/lampadas.svg'
                alt='Lâmpadas'
              />
              <span>Lâmpadas</span>
            </li>
            <li>
              <img
                src='http://localhost:3333/uploads/lampadas.svg'
                alt='Lâmpadas'
              />
              <span>Lâmpadas</span>
            </li>
            <li>
              <img
                src='http://localhost:3333/uploads/lampadas.svg'
                alt='Lâmpadas'
              />
              <span>Lâmpadas</span>
            </li>
            <li>
              <img
                src='http://localhost:3333/uploads/lampadas.svg'
                alt='Lâmpadas'
              />
              <span>Lâmpadas</span>
            </li>
            <li>
              <img
                src='http://localhost:3333/uploads/lampadas.svg'
                alt='Lâmpadas'
              />
              <span>Lâmpadas</span>
            </li>
            <li>
              <img
                src='http://localhost:3333/uploads/lampadas.svg'
                alt='Lâmpadas'
              />
              <span>Lâmpadas</span>
            </li>
          </ul>
        </fieldset>

        <button type='submit'>Cadastrar Ponto de Coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
