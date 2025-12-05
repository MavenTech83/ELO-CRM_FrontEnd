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
                        className='rounded disabled:bg-slate-200 border bg-white/20 hover:bg-cyan-500
                               text-white font-bold w-2/3 mx-auto py-2 flex justify-center items-center gap-4'>
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