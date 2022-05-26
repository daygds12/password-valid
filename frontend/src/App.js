import { useState } from 'react';
import './App.css';
import api from './services/api'



function App() {


  const[messenger, setMessenger] = useState(false)
  const[form, setForm] = useState({
     email: '',
     senha: '',

  })
   //valor
  function handleOnChange(e){
     setForm({
       ...form, [e.target.name]:e.target.value
     })
    
     
    }
    //PREVENT DEFAULT= parar acao padrao
    async function handleSubmit (e){
      e.preventDefault()
      
      if(!form.email || !form.senha){
        setMessenger("Os campos não podem ser vazios")
        console.log(messenger)
        return
       }
      if(!/[A-Z]/.test(form.senha)){
        setMessenger('Você deve incluir uma letra maiuscula e ter até 9 caracteres')
        return
      }

      if(!/[a-z]/.test(form.senha)){
        setMessenger('Você deve incluir uma letra minuscula e ter até 9 caracteres')
        return
      }

      
      if(!/\W|_/.test(form.senha)){
        setMessenger('Você deve incluir um caractere especial e ter até 9 caracteres')
        return
      }
    
      if(form.senha.length > 9){
        setMessenger("A senha precisa ter até 9 digitos")
        return
       }
     try {
       
       api.post('/login', form)
  
       setForm({
         ...form,
         email: '',
         senha: '',
       })
       const segundos = 2
       setMessenger('Usuario logado com sucesso')
       setTimeout(()=>{
           setMessenger(false)
       },segundos*1000)

     } catch (error) {
       console.log(error.message)
     }

        
  }

   

  return (
    
    <div className="App">

      <div className='login'><h1>Login</h1></div>
      <form onSubmit={handleSubmit}>
            <input value={form.email} onChange={handleOnChange} type="email" name="email" placeholder='Digite seu e-mail'/>
            <input value={form.senha}  onChange={handleOnChange} type="password" name="senha" placeholder='Digite sua senha'/>
       
           <button >entrar</button>
           
      </form>
      {messenger && <p>{messenger}</p>}

      <div className='dicas'>
        <p>* Senha deve conter até 9 caracteres</p>
        <p>* Senha deve conter uma letra maiuscula</p>
        <p>* Senha deve conter uma letra minuscula</p>
        <p>* Senha deve conter um caractere especial</p>
        
      </div>
     
  </div>
  );
}

export default App;
