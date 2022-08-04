import { initializeApp } from "firebase/app"
import { getFirestore, getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore" //importar banco
import React from 'react'
import { useEffect, useState } from "react";

const firebaseApp = initializeApp( {
  apiKey: "AIzaSyCFSpd6lZrAFMRw-3RhxemLYXPKmN7AAvE",
  authDomain: "reactfirebasevc.firebaseapp.com",
  projectId: "reactfirebasevc",
  
});


export default function App() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState([])

  const db = getFirestore(firebaseApp) //conexão com o banco de dados
  const userCollectionRef = collection(db, "users") //referência do banco da tabela users

  async function createuser() { //cadastrar um cliente no banco
    const user = await addDoc(userCollectionRef, { 
      name, email
    })
    console.log(user)
  }

  useEffect(() => {  //trazer as informações já cadastradas do banco para tela
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef) 
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

    }
    getUsers();
  }, []) 


  async function deleteUser(id) {
    const userDoc = doc(db, 'users', id)
    await deleteDoc(userDoc)
  }


  return ( //renderizar na tela os dados cadastrados no banco
    <div>
      <input type="text" 
      placeholder="Nome"
      value={name} 
      onChange={(e) => setName(e.target.value)} //captura o valor e armazena na variável
      />

      <input type="text" 
       placeholder="Email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       />

      <button onClick={createuser} type="submit">Criar usuário</button>
      <ul>
          {users.map(user => {
            return (
              <div key={user.id}>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <button onClick={() => deleteUser(user.id)} type="submit">Deletar</button>
              </div>
            )
          })}
      </ul>
    </div>
  )
}
