import React from 'react';

const handleNickname = () => {
    document.getElementById('message').value = '/nick : ';
  }

  const handleChannel = () => {
    document.getElementById('message').value = '/list : ';
  }

  const handleCreate = () => {
    document.getElementById('message').value = '/Create : ';
  }

  const handleDelete = () => {
    document.getElementById('message').value = '/delete : ';
  }

  const handleJoin = () => {
    document.getElementById('message').value = '/join : ';
  }

  const handleLeave = () => {
    document.getElementById('message').value = '/leave : ';
  }

  const handleUsers = () => {
    document.getElementById('message').value = '/users : ';
  }

  const handleMsg = () => {
    document.getElementById('message').value = '/msg : ';
  }

  const handleMessage = () => {
    document.getElementById('message').value = '/message : ';
  }


const Modal = () => {
    return (
        <div className="dropdown">
            <button type="button" className="btn btn-success commande_btn" data-bs-toggle="dropdown" >@</button>
            <ul className="dropdown-menu p-2">
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleNickname}><strong >/nick</strong> : <i>Définir un surnom</i> </div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleChannel}><strong >/list</strong> : <i>Channels disponibles</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleCreate}><strong >/create</strong> : <i>Créer un channediv</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleDelete}><strong >/delete</strong> : <i>Supprimer un channediv</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleJoin}><strong >/join</strong> : <i>Rejoindre un channel</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleLeave}><strong >/leave</strong> : <i>Quitter le channel</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleUsers}><strong >/users</strong> : <i>Utilisateurs connectés</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleMsg}><strong >/msg</strong> : <i>Envoier un message à un utilisateur spécifique</i></div></li>
                <li className="text-success" style={{ cursor: 'pointer' }}><div onClick={handleMessage}><strong >/message</strong> : <i>Envoier un message à tous les utilisateurs</i></div></li>
            </ul>
        </div>
    )
}

export default Modal