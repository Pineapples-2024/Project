function Page() {
    const cookies = document.cookie.split(";");
    const cookieArray = document.cookie.split(";").map(item => item.trim()).map(item => item.split("="));
    const nameCookie = cookieArray.find(item => item[0] == "name");

    if (nameCookie) {
        return (
            <>Hello! Seems like you are logged in as {nameCookie[1]}</>
        );
    } else {
        return (
            <>You are not logged in. Please do that.</>
        )
    }
}

export default Page;