import { Footer } from "./modules/Footer/Footer";  // импорт Footer.jsx
import { Goods } from "./modules/Goods/Goods";
import { Header } from "./modules/Header/Header";
import { Filter } from "./modules/Filter/Filter";
import { Hero } from "./modules/Hero/Hero";
import { Subscribe } from "./modules/Subscribe/Subscribe";
import { Order } from "./modules/Order/Order.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerCart } from "./redux/cartSlice.js";
import { useState } from "react";



export const App = () => {

    const dispatch = useDispatch();

    //заводим перем состония
    const [ titleGoods, setTitleGoods ] = useState("Букеты");


    useEffect(() => {

        const initializeCart = async () => {
            await dispatch(registerCart());
        // await фукния яполучения данных из корзины
        };

        initializeCart();
        
    }, [ dispatch ]);





    return (
    //пустые <> </>  это React.Fragment, можно не писать  его и отсавить пустыми <></>
    <>  {/* родитель */}
        <Header setTitleGoods={setTitleGoods} />   {/*  вызов компонента Header,  впропс передали функцию setTitleGoods() */}

        <main>
            <Hero />

            <Filter setTitleGoods={setTitleGoods} />   {/* передем фукнцию  */}

            <Goods title={titleGoods} /> 

            <Subscribe />
        </main> 

        <Footer />   

        <Order />

    </>
    )
}

