import { Taxa } from '../../../../../model/Taxa';
import { Servico } from './../../../../../model/Servico';

export class ServicoCliente {
    servico: Servico = new Servico();
    taxa: Taxa;
    descricao: string;
    prazo: number;

    public constructor(init?: Partial<Taxa>) {
        Object.assign(this, init);
    }

}
