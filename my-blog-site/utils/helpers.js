const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`;
};

module.exports = { formatDate };
