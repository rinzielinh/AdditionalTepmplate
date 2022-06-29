import React, { useState, useRef } from 'react'
import Advice from './advice'
import '../../styles/custom.css'
import '../../App.css'

const Main = ({data}) => {
    const [essAdvice, setEssAdvice] = useState(false);
    
    const preChildStateRef = useRef();
    const postChildStateRef = useRef();
    const essChildStateRef = useRef();
    

    const getChildState = () => {
       
        console.log('preChildState :>> ', preChildStateRef.current.getAdvice());
        console.log('postChildState :>> ', postChildStateRef.current.getAdvice());
        if ( essAdvice ) {
            console.log('essChildState :>> ', essChildStateRef.current.getAdvice());
        }
        
    }

    let sizePre = 0;
    let sizePost = 0;
    let sizeEss = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].category == "preAdvice") {
            sizePre++;
        } else if (data[i].category == "postAdvice") {
            sizePost++;
        } else {
            sizeEss++;
        }
    }

    const preAdviceData = data.slice(0, sizePre);
    const postAdviceData = data.slice(sizePre, sizePost + sizePre);
    const essAdviceData = data.slice(sizePost + sizePre)

    return (
        <div className="main">
            {data.length > 0 && (
                <div className="container">
                    <div className="row">
                        
                        <div className="col-5">
                            <div className="wrapper-questions category">Pre advice</div>
                            <Advice data={preAdviceData} ref={preChildStateRef} category="preAdvice"/>
                        </div>
                        <div className="col-5">
                            <div className="wrapper-questions category">Post advice</div>
                            <Advice data={postAdviceData} ref={postChildStateRef} category="postAdvice"/>
 
                            <div className="wrapper-questions">
                                <div className="question">
                                    <button onClick={() => setEssAdvice(prev => !prev)} >Show/Hide Ess Advice</button>
                                </div>

                            </div>

                            {essAdvice && (
                                <div>
                                    <div className="wrapper-questions category">Ess advice</div>
                                    <Advice data={essAdviceData} ref={essChildStateRef} category="essAdvice"  />
                                </div>
                            )
                            }

                        </div>
                    </div>
                    <div className="row center">
                        <button onClick={getChildState}>Submit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Main
