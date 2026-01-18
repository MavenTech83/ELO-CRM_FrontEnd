import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import FormOportunidade from '../formoportunidade/FormOportunidade';
import { HandshakeIcon } from '@phosphor-icons/react';

function ModalOportunidade() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='rounded-lg shadow-2xl border disabled:bg-slate-200 bg-cyan-600 hover:bg-cyan-500
                               text-white font-bold w-2/3 mx-auto p-2 gap-4 flex justify-center items-center'>
                        <HandshakeIcon size={32} /> Nova Oportunidade
                    </button>
                }
                modal
                closeOnDocumentClick={true}
                closeOnEscape={true}
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    overflow: 'visible',
                }}
            >
                <FormOportunidade />
            </Popup>
        </>
    );
}

export default ModalOportunidade;