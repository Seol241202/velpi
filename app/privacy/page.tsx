export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif", color: "#111", lineHeight: 1.7 }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>Last updated: June 19, 2026</p>

      <p>Velpi ("we", "our", or "us") is operated by Yehgee April Kim. This Privacy Policy explains how we collect, use, and protect your information when you use the Velpi mobile application.</p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Information We Collect</h2>
      <ul>
        <li><strong>Account Information:</strong> Email address and name when you register.</li>
        <li><strong>Pet Information:</strong> Pet name, type, breed, birthday, weight, photo, and health records you choose to enter.</li>
        <li><strong>Usage Data:</strong> App features you use and how you interact with the app.</li>
        <li><strong>Photos:</strong> Pet photos you upload for profile or AI Health Check features.</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>How We Use Your Information</h2>
      <ul>
        <li>To provide and improve Velpi's features</li>
        <li>To analyze pet photos using AI (via Anthropic's Claude API)</li>
        <li>To store your pet's health and vaccine records</li>
        <li>To send important service updates</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Third-Party Services</h2>
      <ul>
        <li><strong>Firebase (Google):</strong> Authentication and data storage</li>
        <li><strong>Anthropic:</strong> AI-powered health analysis</li>
        <li><strong>Remove.bg:</strong> Pet photo background removal</li>
        <li><strong>Google Places API:</strong> Veterinary clinic search</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Data Storage & Security</h2>
      <p>Your data is stored securely using Firebase. Pet photos are stored locally on your device unless you explicitly upload them. We do not sell your personal information to third parties.</p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Children's Privacy</h2>
      <p>Velpi is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Your Rights</h2>
      <ul>
        <li>Access or delete your account and data at any time</li>
        <li>Request a copy of your data</li>
        <li>Opt out of non-essential communications</li>
      </ul>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 8 }}>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at:</p>
      <p><strong>Email:</strong> <a href="mailto:hello@velpi.pet" style={{ color: "#0792de" }}>hello@velpi.pet</a></p>
      <p><strong>Website:</strong> <a href="https://velpi.pet" style={{ color: "#0792de" }}>velpi.pet</a></p>

      <hr style={{ margin: "40px 0", borderColor: "#eee" }} />
      <p style={{ color: "#999", fontSize: 13 }}>© 2026 Velpi by Yehgee April Kim. All rights reserved.</p>
    </div>
  );
}