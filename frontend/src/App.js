import { useState } from 'react';
import './App.css';
import api from './services/api'


function App() {

  const[messenger, setMessenger] = useState(false)
  const[form, setForm] = useState({
     email: '',
     senha: '',

  })

  function handleOnChange(e){
     setForm({
       ...form, [e.target.name]:e.target.value
     })
    
     
    }
    
    async function handleSubmit (e){
      e.preventDefault()
      
      if(!form.email || !form.senha){
        setMessenger("Os campos não podem ser vazios")
        console.log(messenger)
        return
       }
      if(!/[A-Z]/.test(form.senha)){
        setMessenger('Precisa incluir uma letra maiuscula e ter até 9 caracteres')
        return
      }
      if(!/\W|_/.test(form.senha)){
        setMessenger('Precisa incluir um caractere especial e ter até 9 caracteres')
        return
      }
    
      if(form.senha.length > 9){
        setMessenger("Senha precisa até 9 digitos")
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

      <div><h1>Login</h1></div>
      <form onSubmit={handleSubmit}>
            <input value={form.email} onChange={handleOnChange} type="email" name="email" placeholder='Digite seu e-mail'/>
            <input value={form.senha}  onChange={handleOnChange} type="password" name="senha" placeholder='Digite sua senha'/>
       
           <button >clique aqui</button>
           
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
