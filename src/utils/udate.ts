export class UDate {

    public getCurrentDateTimeString(): any {
        try {
            const _date = new Date();
            // EC2 BACKEND TIMEZONE (3 hours)
            _date.setTime(_date.getTime() - (3 * 60 * 60 * 1000));
            return `${_date.toLocaleDateString('pt-BR')} ${_date.toLocaleTimeString('pt-BR')}`;
        } catch (Error) {
            return '';
        }
    }

    public simpleStamp(): string {
        let date = this.getCurrentDateTimeString();
        const dateAndHour = date.split(' ');
        const myDate = dateAndHour[0];
        const myHour = dateAndHour[1];
        const splittedDate = myDate.split('/');
        const splittedHour = myHour.split(':');
        const stamp = `${splittedDate[2].slice(2)}${splittedDate[1]}${splittedDate[0]}${splittedHour[0]}${splittedHour[1]}`;
        return stamp;
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
