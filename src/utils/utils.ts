import { ObjectId } from 'mongodb';
export class Utils {

    public sanitizeText(text: string) {
        return text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
            .replace(/\-\-+/g, '-')	// Substitui multiplos hífens por um único hífen
            .replace(/(^-+|-+$)/, '') // Remove hífens extras do final ou do inicio da string
            .toLowerCase() : '';
    }

    public convertIdToObjectId(myFilter: any): any { 
        Object.entries(myFilter).forEach(entrie => {
            const splitted = entrie[0].split('.');
            const lastOne = splitted[splitted.length - 1];
            if (lastOne === '_id' && typeof entrie[1] === 'string') {
                myFilter[entrie[0]] = new ObjectId(entrie[1]);
            }
        });
        return myFilter;
    }
    
}