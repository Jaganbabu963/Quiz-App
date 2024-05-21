import React, { useState,useRef } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';


const Quiz = () => {

     let [index,setIndex] = useState(0);
     let [question,setQuestion] = useState(data[index]);
     let [lock,setLock]=useState(false);
     let [score,setScore]=useState(0);
     let [result,setResult] = useState(false);

     let Option1 = useRef(null);
     let Option2 = useRef(null);
     let Option3 = useRef(null);
     let Option4 = useRef(null);

     let opt_array = [Option1,Option2,Option3,Option4];

     const checkans= (e,ans)=>{
          if(lock === false){
               if(question.ans===ans){
                    e.target.classList.add("right")
                    setLock(true);
                    setScore(prev=>prev+1);
               }
               else
               e.target.classList.add("wrong")
               setLock(true);
               opt_array[question.ans-1].current.classList.add("right")
          }

     }
     const next = ()=>{
          if(lock === true){
               if(index===data.length-1){
                    setResult(true);
                    return 0;
               }
               setIndex(++index);
               setQuestion(data[index]);
               setLock(false);
               opt_array.map((option)=>{option.current.classList.remove("right")
               option.current.classList.remove("wrong")})

          }
     }

     const reset = ()=>{
         setResult(false);
         setLock(false);
         setIndex(0);
         setQuestion(data[0]);
         setScore(0);
     }


  return (
    <div className = 'container'>
     <h1>Quiz App</h1> 
     <hr/>
     {result?<>
          <h2>You score is {score} out of {data.length} </h2>
          <button onClick={(e)=>reset()}>Reset</button>
     </>:<></>}
     
     {result?<></>:<>    
     <h2>{index+1}. {question.question}</h2>
     <ul>
          <li ref={Option1} onClick = {(e)=>checkans(e,1)}>{question.option1}</li>
          <li ref={Option2} onClick = {(e)=>checkans(e,2)}>{question.option2}</li>
          <li ref={Option3} onClick = {(e)=>checkans(e,3)}>{question.option3}</li>
          <li ref={Option4} onClick = {(e)=>checkans(e,4)}>{question.option4}</li>
     </ul>  
     <button onClick={(e)=>next()}>Next</button>  
     <div className='footer'>{index+1} out of {data.length} Questions</div> 
     </>}

    </div>
  )
}

export default Quiz
