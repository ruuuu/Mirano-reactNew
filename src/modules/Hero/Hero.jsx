import './hero.scss';


{/* Компонент */}
export const Hero = () => {

    return (

        <section className="hero">  
            <div className="container">
                <div className="hero__head-group">
                    <h1 className="hero__title"> Авторские букеты </h1>
                    <p className="hero__subtitle"> и подарки </p>
                </div>

                <figure className="hero__group-image">
                    <picture className="hero__image hero__image--left">
                        <source srcSet="/img/flower-left@1x.avif 1x, /img/flower-left@2x.avif 2x" type="image/avif" /> {/*  srcset в реакте будет как srcSet: */}
                        <source srcSet="/img/flower-left@1x.webp 1x, /img/flower-left@2x.webp 2x" type="image/webp" />   {/*  для DPR:2.0  загрузится 2x, для обычных экранов 1x, avif легче чем webp */}
                        <img src="/img/flower-left@1x.jpg" srcSet="/img/flower-left@2x.jpg 2x" width="284" height="352"
                        alt="Букет маков" />
                    </picture>

                    <svg className="hero__image hero__image--center" role="img" aria-label="розовые розы и пионы" width="680"
                        height="588" viewBox="0 0 680 588" fill="none" xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"> {/*  добавили preserveAspectRatio="xMidYMid slice" типа background-size: cover 
                        Добавили aria-label и role="img". Для очищения лишних элементов у svg, используем https://svgomg.net/    */}
                        <clipPath id="hero">
                            <path
                            d="M680 112.187C680 137.954 653.568 161.688 609.146 180.61C653.568 211.682 680 250.658 680 292.973C680 335.869 652.836 375.335 607.304 406.613C652.836 425.66 680 449.692 680 475.813C680 537.649 527.777 587.776 340 587.776C152.223 587.776 0 537.649 0 475.813C0 449.692 27.1636 425.66 72.6961 406.613C27.1636 375.335 0 335.869 0 292.973C0 250.658 26.4319 211.682 70.854 180.61C26.4319 161.688 0 137.954 0 112.187C0 50.3515 152.223 0.223633 340 0.223633C527.777 0.223633 680 50.3515 680 112.187Z"
                            fill="#D9D9D9" />
                        </clipPath>

                        <foreignObject clipPath="url(#hero)" width="100%" height="100%">  {/*  clippath id="hero"  в реакте clip-path пишется слитно */}
                            <div className="hero__image-center"> </div>
                        </foreignObject>

                        <image xlinkHref="/img/flower-center@1x.jpg" clipPath="url(#hero)" preserveAspectRatio="xMidYMid slice" />
                    </svg>


                    <picture className="hero__image hero__image--right">
                        <source srcSet="/img/flower-right@1x.avif 1x, /img/flower-right@2x.avif 2x" type="image/avif" />
                        <source srcSet="/img/flower-right@1x.webp 1x, /img/flower-right@2x.webp 2x" type="image/webp" />
                        <img src="/img/flower-right@1x.jpg" srcSet="/img/flower-right@2x.jpg 2x" width="284" height="352"
                        alt="Букет пионов" />
                    </picture>
                </figure>
            </div>
        </section>
    )
};