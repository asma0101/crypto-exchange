import '../Shared/Styles/Footer.scss';
function Footer() {
    let iconBgColors = ['#3b5998', '#55acee', '#dd4b39', '#ac2bac', '#0082ca', '#333333', 'rgba(0, 0, 0, 0.2)'];
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <footer class="bg-dark text-center text-white footer">
                            <div class="container p-4 pb-0">
                                <section class="mb-4">
                                    <a
                                        class="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[0] }}
                                        href="#!"
                                        role="button"
                                        ><i class="bi bi-facebook"></i
                                    ></a>

                                    <a
                                        class="btn text-white btn-floating m-1"
                                        style={{backgroundColor: iconBgColors[1]}}
                                        href="#!"
                                        role="button"
                                        ><i class="bi bi-twitter"></i
                                    ></a>

                                    <a
                                        class="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[2] }}
                                        href="#!"
                                        role="button"
                                        ><i class="bi bi-google"></i
                                    ></a>

                                    <a
                                        class="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[3] }}
                                        href="#!"
                                        role="button"
                                        ><i class="bi bi-instagram"></i
                                    ></a>

                                    <a
                                        class="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[4] }}
                                        href="#!"
                                        role="button"
                                        ><i class="bi bi-linkedin"></i
                                    ></a>
                                    <a
                                        class="btn text-white btn-floating m-1"
                                        style={{ backgroundColor: iconBgColors[5] }}
                                        href="#!"
                                        role="button"
                                        ><i class="bi bi-github"></i
                                    ></a>
                                </section>
                            </div>
                            <div class="text-center p-3" style={{ backgroundColor: iconBgColors[6] }} >
                                © 2020 Copyright: Crypto-Exchange
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            
            
        </>
    );
}

export default Footer;