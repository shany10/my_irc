import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Navebar from './compenant/navebar';
import "../css/home.css"
import Modal from './compenant/modal';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

const Home = () => {

    const location = useLocation();
    const [message, setMessage] = useState("")
    const [room, setRoom] = useState("")
    const [room_title, setRoomTitle] = useState("default")

    const sendMessage = (e) => {
        e.preventDefault()

        if (message === "") {
            return;
        }
        const occurence_1 = message.indexOf('/')
        const occurence_2 = message.indexOf(':')
        if (occurence_1 !== -1 && occurence_2 !== -1) {

            let tag = message.substring(occurence_1, occurence_2)
            console.log(tag)
            switch (tag) {
                case "/nick ":

                    const newName = message.substring(occurence_2 + 1)
                    if (newName === "") {
                        return;
                    }
                    alert(newName)
                    location.state.userName = newName
                    document.getElementById('message').value = ""
                    break
                default:
            }
            return

        }
        socket.emit('send_message', { message: message, user: location.state.userName, room: room })
        document.getElementById('message').value = ""
    }

    const sendRoom = (e) => {
        e.preventDefault()
        if (room !== "") {
            socket.emit('join_room', { room: room, user: location.state.userName })
        }
    }

    function remove_room() {
        const room_display = this.parentElement.getElementsByClassName('room_display')[0]
        socket.emit('remove_room', (room_display.innerText))
        this.parentElement.remove()
    }

    function joindre() {
        const room_display = this.parentElement.getElementsByClassName('room_display')[0]
        socket.emit('join_room', { room: room_display.innerText, user: location.state.userName, inviter: 'inviter' })
    }


    useEffect(() => {
        return () => {

            socket.emit("user_join", { user: location.state.userName, room: room })

            socket.on("join_display", (data) => {
                if (data.user !== location.state.userName && data.room !== 'default') {
                    const box_room = document.getElementById("box_room")
                    let div_room = document.createElement("div")
                    div_room.innerHTML = "<span class='room_display'>" + data.room + "</span><button class='btn btn-success btn_joindre'>joindre</button>"
                    div_room.className = "room"
                    box_room.appendChild(div_room)
                    const btn_joindre = document.getElementsByClassName('btn_joindre')
                    for (let int = 0; int < btn_joindre.length; int++) {
                        btn_joindre[int].addEventListener('click', joindre)
                    }

                }

                const box_message = document.getElementById('box_message')
                let div_join = document.createElement("div");
                div_join.className = "div_join"
                div_join.innerHTML = data.user + " join room: " + data.room
                box_message.appendChild(div_join)

            })

            socket.on('receive_message', async (data) => {
                setMessage("")
                const box_message = document.getElementById('box_message')
                let div_message = document.createElement("div");
                let div_user_name = document.createElement("div");
                if (socket.id === data.user_id) {
                    data.user = "vous"
                    div_user_name.className = "div_user_name"
                    div_message.className = "div_message"
                }
                else {
                    div_user_name.className = "div_user_sender"
                    div_message.className = "div_message_sender"
                }
                div_message.innerHTML = data.message
                div_user_name.innerHTML = data.user
                box_message.appendChild(div_user_name)
                box_message.appendChild(div_message)
            })

            socket.on("message_room", (data) => {
                if (data.message === "ok" && data.inviter !== "inviter") {
                    document.getElementById('room').value = ""
                    const box_room = document.getElementById("box_room")
                    let div_room = document.createElement("div")
                    div_room.innerHTML = "<span class='room_display'>" + data.room + "</span><button class='btn btn-success btn_inviter'>inviter</button>" +
                        "<button class='btn btn-danger btn_supprimer'>supprimer</button>"
                    div_room.className = "room"
                    box_room.appendChild(div_room)
                    document.getElementById("message_room").innerText = ""
                    const btn_supprimer = document.getElementsByClassName('btn_supprimer')
                    for (let int = 0; int < btn_supprimer.length; int++) {
                        btn_supprimer[int].addEventListener('click', remove_room)
                    }
                    setRoomTitle(data.room)
                    document.getElementById('box_message').innerHTML = ''
                }
                else if (data.inviter !== "inviter") {
                    document.getElementById("message_room").innerText = data.message
                }
            })
        }
    }, [socket])

    return (
        <div>
            <header>
                <Navebar />
            </header>
            <main className='container'>
                <div className='place container_info'>
                    <h1>hello {location.state.userName}</h1>
                    <form onSubmit={(e) => sendRoom(e)}>
                        <div className="input-group mb-3 mt-3 room">
                            <input type="text" className='input_room' id='room' onChange={(e) => setRoom(e.target.value)} placeholder='room...' />
                            <button className='btn btn-info' type='submit'>room</button>
                            <div id='message_room'></div>
                        </div>
                    </form>
                    <div id='handel_room'>
                        Vos chanels :
                    </div>
                    <div id='box_room'></div>
                </div>
                <div className='place container_message'>
                    <h2 id="title_room">{room_title}</h2>
                    <div id="box_message"></div>
                    <form onSubmit={(e) => sendMessage(e)}>
                        <div className="input-group mb-3 mt-3">
                            <input onChange={(e) => setMessage(e.target.value)} id='message' type="text" className="form-control" placeholder="message..." aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <Modal />
                            <button type='submit' className="btn btn-primary" id="button-addon2">send</button>
                        </div>
                    </form>

                </div>
                <div className='place container_list'>

                </div>
            </main>
        </div>
    )
}

export default Home
