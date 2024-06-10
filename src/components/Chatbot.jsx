import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {MessageOutlined, RemoveCircle, Send} from '@mui/icons-material';
import logo from '../assets/logo.png'
import axios from "../plugins/axios";
import {statusLoginActions} from "../store/statusLoginSlice";
import jwt from "../plugins/jwt";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [modalChatBot, setModalChatBot] = useState(false);
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const newUserMessage = {
                message: inputValue,
                type: "text",
                isUser: true,
            };

            setMessages(prevMessages => [...prevMessages, newUserMessage]);

            const payload = {
                sender: "user",
                message: inputValue
            };

            try {
                const response = await axios.post('http://0.0.0.0:5005/webhooks/rest/webhook', payload);

                if (response.data && response.data.length > 0) {
                    const botMessage = {
                        message: response.data[0].text,
                        type: "text",
                        isUser: false,
                    };
                    setMessages(prevMessages => [...prevMessages, botMessage]);
                } else {
                    setMessages(prevMessages => [...prevMessages, {
                        message: "Tôi không thể trả lời câu hỏi của bạn. Hãy hỏi một câu hỏi khác.",
                        type: "text",
                        isUser: false,
                    }]);
                }

                setInputValue("");
            } catch (e) {
                console.error(e);
            }
        }
    };


    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <>
            <div onClick={() => setModalChatBot(!modalChatBot)} className="btn__chatbot">
                <MessageOutlined />
                <span>Chat</span>
            </div>

            {modalChatBot && (
                <div className="chatbot__modal">
                    <div className="chatbot__modal--title">
                        <img className="chatbot__logo" src={logo} alt="logo"/>
                        <div className="chatbot__title-text">
                            <div>Bệnh viện</div>
                            <span>Gửi hỗ trợ đến chúng tôi</span>
                        </div>
                        <RemoveCircle onClick={() => setModalChatBot(false)}/>
                    </div>
                    <div className="chatbot__message-list">

                        <div className="chatbot__message-item chatbot__message-item--bot">
                            <p className="chatbot__message-content">
                                Chào bạn, bạn đang tìm hiểu và cần hỗ trợ về vấn đề gì? Hãy kết nối với chúng tôi!
                            </p>
                        </div>
                        {messages.map((item, index) => {
                            switch (item.type) {
                                case "text":
                                    return (
                                        <div
                                            className={`chatbot__message-item ${item.isUser ? "chatbot__message-item--user" : "chatbot__message-item--bot"}`}
                                            key={index}
                                            onClick={typeof item?.onClick == 'function' ? item?.onClick : null}
                                        >
                                            <p className="chatbot__message-content">{item.message}</p>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="chatbot__modal--footer">
            <input
              placeholder="Hãy nhập câu hỏi của bạn..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="chatbot__input form-control"
            />
            <Send className="footer__icon" onClick={handleSendMessage} />
          </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;