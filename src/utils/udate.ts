export class UDate {

    public getCurrentDateTimeString(): any {
        try {
            const _date = new Date();
            // EC2 BACKEND TIMEZONE (0 hours)
            // _date.setTime(_date.getTime() - (0 * 60 * 60 * 1000));
            return `${_date.toLocaleDateString('pt-BR')} ${_date.toLocaleTimeString('pt-BR')}`;
        } catch (Error) {
            return '';
        }
    }

    public timeConsoleLog(log?: string, moreInf?: any): void {
        console.log(`${this.getCurrentDateTimeString()}`);
        if (log) {
            if (moreInf) {
                console.log(log, moreInf);
            } else {
                console.log(log);
            }
        }
        console.log('\n');
        console.log('-------------------------------------------------------------------------------------------------------------');
    }
}
