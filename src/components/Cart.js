import React from 'react';


export default function Cart({cart, totalAffiche}) {
    const totalEnEuros = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(totalAffiche);

    return (
        <div className="cart">
            <div className="head-cart">
                <h2>🛒 Panier 🛒</h2>
                <h3>
                    <span style={{color: 'green'}}>Total</span> : {totalEnEuros}
                </h3>
            </div>
            <div className="items-cart">
            <ul>
                {cart !== null ? cart.map((element) => (
                    <li key={element.fruit}>
                        <strong>{element.fruit}</strong> :{' '}
                        {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                        }).format(element.prix)}
                    </li>
                )) : ""}
            </ul>
            </div>
        </div>
    );
}
