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

    public returnPaginationObject(req: any): object {
        let pagination = {}; 
        if (req.query['page'] && req.query['perpage']) {
            pagination = {
                page: Number(req.query['page']),
                perpage: Number(req.query['perpage'])
            }
        } 
        return pagination;
    }

    public returnSortObject(req: any): object {
        let mySort;
        const queryArr = req.query ? Object.entries(req.query) : [];
        
        queryArr.forEach(param => {
            if (param[0].includes('sort.')) {
                if (!mySort) { mySort = {}; }
                const paramName = param[0].split('.')[1];
                mySort[paramName] = param[1];
            }
        });
        return mySort;
    }
    
}