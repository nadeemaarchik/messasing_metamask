import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { Button } from "react-bootstrap";
import Web3 from 'web3';
export default function ChatInput({currentChat, handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const sendMoney = async (event) => {
    event.preventDefault();
    console.log("currentChat nadeem",currentChat);
    if (msg.length > 0) {
      console.log("meg",msg);
      var checkString = /^[0-9]+$/;
      console.log("checkString",checkString.test(msg));
      if(checkString.test(msg)){
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const weiValue = Web3.utils.toWei(msg, 'ether');
        console.log("weiValue",weiValue);
        console.log("accounts",accounts[0]);
        await web3.eth.sendTransaction({to: currentChat.metamask, from: accounts[0], value: weiValue});
        var msgWithEther = `Send ${msg} Ether`;
        handleSendMsg(msgWithEther);
      }
      setMsg("");
    }
    // const web3 = new Web3(window.ethereum);
    // const accounts = await web3.eth.getAccounts();
    // const weiValue = Web3.utils.toWei(amount, 'ether');
    // console.log("weiValue",weiValue);
    // console.log("accounts",accounts[0]);
    // await web3.eth.sendTransaction({to: walletAddress, from: accounts[0], value: weiValue});
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message / account here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
      <div className="sendManey-container" onClick={sendMoney}>
        <div className="sendManeyNdm">
          <Button >Send Maney</Button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  justify-content: space-between;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 80%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  .sendManey-container{
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background-color: #9a86f3;
      cursor: pointer;
      button{
        background-color: #9a86f3;
        border: none;
      }
  }
`;
