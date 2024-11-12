import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Soal5 = () => {
  // 5. buatlah fungsi untuk menutup modal ketika tombol back browser diklik
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const handleBackButton = () => {
      if (openModal) {
        setOpenModal(false);
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [openModal]);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);

    if (!openModal) {
      history.pushState(null, '', location.href);
    }
  };

  return (
    <>
      <div style={{ margin: '1rem' }}>
        {openModal && <Modal />}
        <button
          style={{ padding: '2px 4px', background: 'white' }}
          onClick={toggleModal}
        >
          {openModal ? 'close' : 'open'} modal
        </button>
      </div>
    </>
  );
};

const Modal = () => {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return <></>;
  return ReactDOM.createPortal(
    <section
      style={{
        background: '#8f9cb0',
        padding: '3rem',
        position: 'fixed',
        margin: '6rem',
      }}
    >
      <div>This is modal</div>
    </section>,
    modalRoot
  );
};

export default Soal5;
