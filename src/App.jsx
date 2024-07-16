import { Footer } from "./modules/Footer/Footer";  // импорт Footer.jsx
import { Goods } from "./modules/Goods/Goods";
import { Header } from "./modules/Header/Header";
import { Filter } from "./modules/Filter/Filter";
import { Hero } from "./modules/Hero/Hero";
import { Subscribe } from "./modules/Subscribe/Subscribe";
import { Order } from "./modules/Order/Order.jsx";





export const App = () => {

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

