import React from 'react'

const FreeText = ( {name, onChange, index } ) => {
  

  // const handleFreeTextChange = (e) => {
  //   console.log('e.target :>> ', e.target);
  // }
  return (
    <div>
      {/* <textarea onInput={e => setInput(e.target.value)} value={value} rows="4" cols="70" onChange={handleFreeTextChange}> </textarea> */}
      <input className="free-text" type="text" name={name} onChange={onChange} qindex={index} />
      
    </div>
    
  )
}

export default FreeText