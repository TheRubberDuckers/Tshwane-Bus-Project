function Banner() {
  const bannerStyle = {
    width: "100%",
    height: "200px",
    backgroundColor: "#1f8a2f", // Tshwane green
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
  };

  return (
    <div style={bannerStyle}>
      <a 
        href="https://www.tshwane.gov.za/?page_id=719" 
        target="_blank"
        style={linkStyle}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Tshwane Bus Route</h1>
      </a>
    </div>
  );
}

export default Banner;
