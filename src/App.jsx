import { Footer } from "./modules/Footer/Footer";  // импорт Footer.jsx
import { Goods } from "./modules/Goods/Goods";
import { Header } from "./modules/Header/Header";
import { Filter } from "./modules/Filter/Filter";
import { Hero } from "./modules/Hero/Hero";
import { Subscribe } from "./modules/Subscribe/Subscribe";
import { Order } from "./modules/Order/Order.jsx";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, registerCart } from "./redux/cartSlice.js";
import { useRef } from "react";



export const App = () => {

    const dispatch = useDispatch();

    //заводим перем состония этого компонента
    const [ titleGoods, setTitleGoods ] = useState("");
   


    useEffect(() => {

        const initializeCart = async () => {
            await dispatch(registerCart());
            await dispatch(fetchCart());
        };

        initializeCart();
        
    }, [ dispatch ]);        
   
   



    return (
    //пустые <> </>  это React.Fragment, можно не писать  его и отсавить пустыми <></>
        <>  {/* родитель */}
            <Header  />   {/*  вызов компонента Header */}

            <main>
                <Hero />

                <Filter setTitleGoods={setTitleGoods}  />   {/* filterRef-скролим к секции Filter, передем фукнцию setTitleGoods */}

                <Goods title={titleGoods}  />     {/*   */}

                <Subscribe />
            </main> 

            <Footer />   

            <Order />
        </>
    )
}

