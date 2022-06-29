import React, { useState, forwardRef, useImperativeHandle } from 'react'
import SelectField from '../../elements/select';
import FreeText from '../../elements/freetext/index1';

const Advice = forwardRef(({ data }, _ref) => {

    let size = data.length;
    const [advice, setAdvice] = useState([...Array(size)]);
    const [text, setText] = useState([...Array(size)]);

    const showMultiAnswers = (value, qindex) => {
        
        const answers = [];
        value.map((answer) => {
            answers.push(
                {
                    "adviceGuid": answer.value[1].adviceGuide,
                    "adviceNumber": answer.value[0].adviceNumber,
                    "adviceTitle": answer.label
                }
            )
        })

        let updatedAnswers = [...advice];

        updatedAnswers[qindex] = answers;
        setAdvice(updatedAnswers);
        console.log('updatedAnswers :>> ', updatedAnswers);
    }

    const showAnswer = (value) => {
        
        const answer = [];
        answer.push(
            {
                "adviceGuid": value.value[1].adviceGuide,
                "adviceNumber": value.value[0].adviceNumber,
                "adviceTitle": value.label
            }
        )

        let updatedAnswer = [...advice];
        updatedAnswer[value.index] = answer;
        setAdvice(updatedAnswer);
        console.log('updatedAnswer :>> ', updatedAnswer);
    }

    const showFreeText = (e) => {
        let addedText = [];
        let n = e.target.getAttribute("qindex");
        let obj = {}
        obj[e.target.name] = e.target.value
        addedText.push(obj)
        let updatedText = [...text]
        updatedText[n] = addedText
        console.log('updatedText :>> ', updatedText);
        setText(updatedText);
    }

    useImperativeHandle(_ref, () => ({
        getAdvice: () => {
            return advice.concat(text) ;
        }

    }))

    return (
        <div className="wrapper-questions">
            {data.map((item, index) => {
                var tempData = [];

                return (
                    <div className="question" key={index}>
                        <div>{item.title}</div>

                        {
                            item.dropdown && (
                                <div> {
                                    item.items.map((el) => {

                                        tempData.push({
                                            label: `${el['adviceTitle']}`,
                                            value: [{ adviceNumber: `${el['adviceNumber']}` }, { adviceGuide: `${el['adviceGuid']}` }],
                                            index: index
                                        });
                                    })
                                }

                                    {item.count > 1 ?
                                        (<SelectField isMulti={true} defaultValue={tempData[0]} options={tempData} onChange={showMultiAnswers} count={item.count} qindex={index} />) :
                                        (<SelectField isMulti={false} defaultValue={tempData[0]} options={tempData} onChange={showAnswer} count={item.count} qindex={index} />)
                                    }
                                </div>
                            )
                        }
                        <br />
                        {item.freetext && (
                            <FreeText name={item.name} key={item.name} onChange={showFreeText} index={index}/>
                        )}
                        <br />
                    </div>
                )
            }
            )}

        </div>
    )
})

export default Advice