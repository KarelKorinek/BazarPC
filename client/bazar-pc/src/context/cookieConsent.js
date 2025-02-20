import { useEffect, useState } from "react";
import { Modal, Button} from "react-bootstrap"

const CookieConsent = () => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if(!consent) {
            setShow(true);
        }
    },[]);

    const acceptCookies = () => {
        localStorage.setItem("cookieConsent", "true");
        setShow(false);
    };

    if(!show) return null;

    return (
        <Modal show={show} centered backdrop="static">
            <Modal.Header>
                <Modal.Title>Použití cookies</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tento web používá cookies k zajištění správné funkčnosti.
                Pokračováním v používání souhlasíte s jejich použitím.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={acceptCookies}>
                    Souhlasím
                </Button>
            </Modal.Footer>
      </Modal>
    );
};

export default CookieConsent;