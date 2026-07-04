(function() {
  const footerHTML = `
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4 col-md-6">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="brand-logo"><i class="fas fa-layer-group"></i></div>
            <div>
              <div class="footer-brand-name">EpoxyPro</div>
            </div>
          </div>
          <p class="footer-description">Texas's leading epoxy flooring and concrete coating specialists. Delivering premium floor transformations for residential, commercial, and industrial clients since 2009.</p>
          <div class="social-links">
            <a aria-label="Facebook" class="social-link" href="#"><i class="fab fa-facebook-f"></i></a>
            <a aria-label="Instagram" class="social-link" href="#"><i class="fab fa-instagram"></i></a>
            <a aria-label="LinkedIn" class="social-link" href="#"><i class="fab fa-linkedin-in"></i></a>
            <a aria-label="YouTube" class="social-link" href="#"><i class="fab fa-youtube"></i></a>
            <a aria-label="Houzz" class="social-link" href="#"><i class="fab fa-houzz"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-6">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html"><i class="fas fa-chevron-right"></i> Home</a></li>
            <li><a href="about.html"><i class="fas fa-chevron-right"></i> About Us</a></li>
            <li><a href="gallery.html"><i class="fas fa-chevron-right"></i> Gallery</a></li>
            <li><a href="pricing.html"><i class="fas fa-chevron-right"></i> Pricing</a></li>
            <li><a href="blog.html"><i class="fas fa-chevron-right"></i> Blog</a></li>
            <li><a href="contact.html"><i class="fas fa-chevron-right"></i> Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-md-6 col-sm-6">
          <h4 class="footer-heading">Services</h4>
          <ul class="footer-links">
            <li><a href="service-details.html"><i class="fas fa-chevron-right"></i> Epoxy Coatings</a></li>
            <li><a href="service-details.html"><i class="fas fa-chevron-right"></i> Polyaspartic</a></li>
            <li><a href="service-details.html"><i class="fas fa-chevron-right"></i> Garage Floors</a></li>
            <li><a href="service-details.html"><i class="fas fa-chevron-right"></i> Industrial</a></li>
            <li><a href="service-details.html"><i class="fas fa-chevron-right"></i> Decorative Flake</a></li>
            <li><a href="service-details.html"><i class="fas fa-chevron-right"></i> Concrete Polish</a></li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-6">
          <h4 class="footer-heading">Newsletter</h4>
          <p style="font-size:0.85rem;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:8px;">Get the latest flooring tips, project showcases, and exclusive offers.</p>
          <form aria-label="Newsletter form" class="footer-newsletter-form mt-3" data-validate="">
            <input aria-label="Email for newsletter" class="footer-newsletter-input form-control-custom" id="footer-email" placeholder="Your email address" required="" type="email" />
            <button aria-label="Subscribe" class="footer-newsletter-btn" type="submit"><i class="fas fa-paper-plane"></i></button>
          </form>
          <div style="margin-top:22px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><i class="fas fa-phone" style="color:var(--secondary);width:16px;"></i><a href="tel:+18005551234" style="color:rgba(255,255,255,0.65);font-size:0.88rem;">(800) 555-1234</a></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;"><i class="fas fa-envelope" style="color:var(--secondary);width:16px;"></i><a href="mailto:info@epoxypro.com" style="color:rgba(255,255,255,0.65);font-size:0.88rem;">info@epoxypro.com</a></div>
            <div style="display:flex;align-items:flex-start;gap:10px;"><i class="fas fa-map-marker-alt" style="color:var(--secondary);width:16px;margin-top:3px;"></i><span style="color:rgba(255,255,255,0.65);font-size:0.88rem;">4521 Industrial Blvd,<br />Houston, TX 77001</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom mt-5">
      <div class="container">
        <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <p class="footer-bottom-text mb-0">© 2025 EpoxyPro Contractors. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;

  let footer = document.querySelector('footer.site-footer');
  if (!footer) {
    footer = document.createElement('footer');
    footer.className = 'site-footer';
    const scriptTag = document.currentScript;
    if (scriptTag) {
      scriptTag.parentNode.insertBefore(footer, scriptTag);
    } else {
      document.body.appendChild(footer);
    }
  }
  footer.innerHTML = footerHTML;
})();
