import React, { useState } from 'react';
import CountryView from './CountryView';
import Categories from './Categories';
import PageNavbar from './PageNavBar'
import items from './data';
const allCategories = ['all', ...new Set(items.map((item) => item.category))];

function LeaderBoard() {

    const [CountryItems, setCountryItems] = useState(items);
    const [categories, setCategories] = useState(allCategories);

    const filterItems = (category) => {
        if (category === 'all') {
            setCountryItems(items);
            return;
        }
        const newItems = items.filter((item) => item.category === category);
        setCountryItems(newItems);
    };

    return (
        <main>
            <PageNavbar />
            <section className="menu section">
                <div className="title">
                    <h2>FIFA World Cup Winners</h2>
                    <div className="underline"></div>
                </div>
                <Categories categories={categories} filterItems={filterItems} />
                <CountryView items={CountryItems} />
            </section>
        </main>
    );



}
export default LeaderBoard;