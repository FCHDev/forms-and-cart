import React from 'react';
import {useState, useRef, useEffect} from 'react';
import Cart from './components/Cart';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";


export default function App() {
    // CONST ET STATES
    const fruitRef = useRef();
    const prixRef = useRef();
    const fruits = [
        {
            fruitName: "🍌 Bananes",
            prix: 8,
        },
        {
            fruitName: "🍒 Cerises",
            prix: 7,
        },
        {
            fruitName: "🍐 Poires",
            prix: 9,
        },
        {
            fruitName: "🍏 Pommes",
            prix: 4,
        }
    ]
    const [price, setPrice] = useState()
    const [product, setProduct] = useState()
    const [cart, setCart] = useState([]);

    const [totalAmount, setTotalAmount] = useState([]);
    const [totalAffiche, setTotalAffiche] = useState([]);

    const cartRender = () => {
        return cart.map((element) => (
            <li key={Date.now}>
                ✓ {element.fruit} : {element.prix}€
            </li>
        ));
    };

    // UseEffect : On conserve les données dans le localStorage
    useEffect(() => {
        const data = window.localStorage.getItem('MY_CART');
        if (data !== null) setCart(JSON.parse(data));
    }, []);

    useEffect(() => {
        const data2 = window.localStorage.getItem('MY_TOTAL');
        if (data2 !== null) setTotalAffiche(JSON.parse(data2));
    }, [])

    useEffect(() => {
        window.localStorage.setItem('MY_CART', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        window.localStorage.setItem('MY_TOTAL', JSON.stringify(totalAffiche));
    }, [totalAffiche]);


    // COMPORTEMENTS
    const handleFruitChoice = (event) => {
        const fruitValue = fruitRef.current.value = event.target.value;
        if (fruitValue === fruits[0].fruitName)
            setPrice(fruits[0].prix)
        if (fruitValue === fruits[1].fruitName)
            setPrice(fruits[1].prix)
        if (fruitValue === fruits[2].fruitName)
            setPrice(fruits[2].prix)
        if (fruitValue === fruits[3].fruitName)
            setPrice(fruits[3].prix)
        setProduct(fruitValue)
    }

    const handleSubmit = (e) => {
        // Désactive le comportement par défaut
        e.preventDefault();
        prixRef.current.value = price
        fruitRef.current.value = product
        // On crée une copy du panier en reprenant son historique
        const cartCopy = [...cart];
        // On ajoute nos nouvelles données / Notre nouvel objet
        cartCopy.push({
            fruit: fruitRef.current.value,
            prix: prixRef.current.value,
        });
        // On met à jour notre state "cart" depuis sa copie
        setCart(cartCopy);

        // On calcule le total cumulé à chaque fois qu'on ajoute un article
        const totalAmountCopy = [...totalAmount];
        totalAmountCopy.push(prixRef.current.value);
        setTotalAmount(totalAmountCopy);
        const initialValue = 0;
        const sumWithInitial = totalAmountCopy.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            initialValue
        );
        setTotalAffiche(sumWithInitial);
        setPrice("")
        setProduct("")

        cartRender();
        fruitRef.current.value = '';
        prixRef.current.value = '';
    };

    const handleDeleteCache = () => {
        setCart([]);
        setTotalAffiche([])
        setTotalAmount([])
        setPrice("")
        setProduct("")
        window.localStorage.clear()
    };

    return (
        <div className="main">
            <div className="console">
                <h1>Formulaire ajout de produit (useRef)</h1>
                <h2>Ajouter un fruit et son prix</h2>

                <div className="inputStyle">
                    <form>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="fruits">Fruits</InputLabel>
                            <Select
                                labelId="fruits"
                                id="fruits"
                                value={""}
                                label="Fruits"
                                onChange={handleFruitChoice}
                                ref={fruitRef}
                            >
                                {fruits.map((element) => (
                                    <MenuItem key={element.fruitName} value={element.fruitName}>
                                        {element.fruitName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div className="selected-products">
                            <h3><span>{product}</span></h3>
                            <h3><span ref={prixRef}>{price ? price + "€" : ""}</span></h3>
                        </div>


                            <div className="buttons">
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    size="large">
                                    Ajouter
                                </Button>
                                <Button
                                    onClick={handleDeleteCache}
                                    variant="outlined"
                                    size="large">
                                    Vider Panier
                                </Button>
                            </div>

                    </form>

                </div>


            </div>
            <Cart cart={cart} totalAffiche={totalAffiche}/>
        </div>
    );
}

