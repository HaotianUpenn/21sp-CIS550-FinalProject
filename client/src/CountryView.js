import React from 'react';

const CountryView = ({ items }) => {
  return (
    <div className='section-center'>
      {items.map((countryItem) => {
        const { id, title, img, desc, win_time } = countryItem;
        return (
          <article key={id} className='country-item'>
            <a href={"/country/"+title} >
              <img src={img} alt={title} className='photo' />
            </a>
            <div className='item-info'>
              <header>
                <h4>{title}</h4>
                <h5 className='win_time'> {win_time}</h5>
              </header>
              <p className='item-text'>{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CountryView;
