import React from 'react';
import CountUp from 'react-countup';
import { counterStaticData } from '../../DataSetStatic/AboutUsPage/aboutUSdata';
import aboutST from "./aboutUs.module.css";

const CounterShow = () => {
    return (
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)",gap:"1em", textAlign:"center", margin:"50px auto"}}>
            {
                counterStaticData.map((counter,idx) =><div key={`${counter.name}-${idx}`}>
                    <CountUp
                        start={0}
                        end={counter.count}
                        duration={1.75}
                        delay={0}
                        separator=""
                        decimals={0}
                        decimal="."
                        prefix={counter.symbol}
                        suffix={counter.unit}
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}
                        >
                            {({ countUpRef }) => <div>
                                    <span className={aboutST.counter} ref={countUpRef} />
                                </div>
                            }
                        </CountUp>
                        <div>
                            <h4>{counter.name}</h4>
                            <p style={{color:"#666"}}>{counter.text}</p>
                        </div>
                </div>)
            }
        </div>
    );
};

export default CounterShow;