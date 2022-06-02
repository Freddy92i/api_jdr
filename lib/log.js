module.exports = function({ Log }) {
    const addLog = (type, event, info, UserId) => {
        const log = new Log({
            type : type,
            event : event,
            infos : info,
            UserId : UserId
        });
        log.save()
    }
    return {
        addLog

    }
}

