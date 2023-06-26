import Link from "next/link"



export default function Formation() {

    // const handleDownload = () => {
    //     const pdfUrl = 'https://drive.google.com/file/d/1QC6CncCq2j8ZE2O-A53MQ1nH1YZvo31x/view?usp=drive_link';
    //     const link = document.createElement('a');
    //     link.href = pdfUrl;
    //     link.download = 'nico-eng-certificate.pdf';
    //     link.target = '_blank';
    //     link.click();
    // };

    return (
        <Link 
            href="https://drive.google.com/file/d/1QC6CncCq2j8ZE2O-A53MQ1nH1YZvo31x/view?usp=drive_link" 
            target="_blank"
        >
            <button 
                className="download-button mt-8 mb-12 mx-1 md:mx-20" 
                // onClick={handleDownload}
                >
                <div className="docs">
                    <svg
                        className="css-i6dzq1"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        fill="none"
                        stroke-width="2"
                        stroke="currentColor"
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line y2="13" x2="8" y1="13" x1="16" />
                        <line y2="17" x2="8" y1="17" x1="16" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg> 
                    Certificate
                </div>
                <div className="download">
                    <svg
                        className="css-i6dzq1"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        fill="none"
                        stroke-width="2"
                        stroke="currentColor"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line y2="3" x2="12" y1="15" x1="12" />
                    </svg>
                </div>
            </button>
        </Link>
    )
}
