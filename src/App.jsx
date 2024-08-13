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

    //заводим перем состония
    const [ titleGoods, setTitleGoods ] = useState("Букеты");
    const filterRef = useRef(null);                              // хук, нужен для скролла к элементу


    useEffect(() => {

        const initializeCart = async () => {
            await dispatch(registerCart());
            await dispatch(fetchCart());
        };

        initializeCart();
        
    }, [ dispatch ]);



    const scrollToFilter = () => {
        // console.log('filterRef.current ', filterRef.current) // <section class="filter">
        if(filterRef.current){
            filterRef.current.scrollIntoView({ behavior: 'smooth' }); // скролл к filterRef <Filter />
        } 
    };
   
        
   
   


    return (
    //пустые <> </>  это React.Fragment, можно не писать  его и отсавить пустыми <></>
    <>  {/* родитель */}
        <Header setTitleGoods={setTitleGoods}  scrollToFilter={scrollToFilter}  />   {/*  вызов компонента Header,  впропс передали функцию setTitleGoods() */}

        <main>
            <Hero />

            <Filter setTitleGoods={setTitleGoods}  filterRef={filterRef} />   {/* filterRef-скролим к секции Filter, передем фукнцию setTitleGoods */}

            <Goods title={titleGoods} /> 

            <Subscribe />
        </main> 

        <Footer />   

        <Order />
    </>
    )
}

