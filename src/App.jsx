import { Footer } from "./modules/Footer/Footer";  // импорт Footer.jsx
import { Goods } from "./modules/Goods/Goods";
import { Header } from "./modules/Header/Header";
import { Filter } from "./modules/Filter/Filter";
import { Hero } from "./modules/Hero/Hero";
import { Subscribe } from "./modules/Subscribe/Subscribe";
import { Order } from "./modules/Order/Order.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerCart } from "./redux/cartSlice.js";




export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const initializeCart = async () => {
            await dispatch(registerCart());
        // await фукния я получения данных
        };

        initializeCart();
        
    }, [ dispatch ]);

    return (
    //пустые <> </>  это React.Fragment, можно не писать  его и отсавить пустыми <></>
    <>  {/* родитель */}
        <Header />   {/*  вызов компонента Header */}

        <main>
            <Hero />

            <Filter />

            <Goods /> 

            <Subscribe />
        </main> 

        <Footer />   

        <Order />

    </>
    )
}

