/* =============================================
   SURAJ PRAJAPATI PORTFOLIO — Interactive JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. THEME SWITCHER (DARK / LIGHT MODE) ── */
  const themeToggleBtn = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ── 2. NAVBAR SCROLL EFFECT ────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link highlight
    let currentSection = '';
    document.querySelectorAll('section[id]').forEach(section => {
      if (window.scrollY >= section.offsetTop - 110) {
        currentSection = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ── 3. HAMBURGER MENU ──────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('navLinks');

  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', () => {
      navLinksEl.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinksEl.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    navLinksEl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => {
          s.style.transform = '';
          s.style.opacity = '';
        });
      });
    });
  }

  /* ── 4. ROLE ROTATOR ────────────────────── */
  const roles = document.querySelectorAll('.role-item');
  let currentRole = 0;

  if (roles.length > 0) {
    setInterval(() => {
      roles[currentRole].classList.remove('active');
      roles[currentRole].classList.add('leaving');

      setTimeout(() => {
        roles[currentRole].classList.remove('leaving');
        currentRole = (currentRole + 1) % roles.length;
        roles[currentRole].classList.add('active');
      }, 400);
    }, 2400);
  }

  /* ── 5. SKILL BARS ANIMATION ────────────── */
  const skillSection = document.getElementById('skills');
  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-fill').forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => { bar.style.width = targetWidth; }, 100);
        });
      }
    });
  }, { threshold: 0.2 });

  if (skillSection) skillObserver.observe(skillSection);

  /* ── 6. SCROLL REVEAL ANIMATION ────────── */
  const reveals = document.querySelectorAll(
    '.project-card, .timeline-card, .skill-category, .highlight-item, .contact-card-item, .info-card, .domains-card, .api-sandbox-card'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, (i % 4) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    revealObserver.observe(el);
  });

  /* ── 7. HERO STATS COUNTER ──────────────── */
  const stats = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      stats.forEach(stat => {
        const text = stat.textContent;
        const num = parseInt(text);
        const suffix = text.replace(num.toString(), '');
        let current = 0;
        const step = Math.ceil(num / 30);
        const interval = setInterval(() => {
          current = Math.min(current + step, num);
          stat.textContent = current + suffix;
          if (current >= num) clearInterval(interval);
        }, 40);
      });
    }
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ── 8. INTERACTIVE API SANDBOX EXECUTION ── */
  const testApiBtn = document.getElementById('testApiBtn');
  const apiPayload = document.getElementById('apiPayload');
  const apiResponse = document.getElementById('apiResponse');

  if (testApiBtn && apiResponse) {
    testApiBtn.addEventListener('click', () => {
      apiResponse.innerHTML = '<code>Processing request in .NET Core 8 Web API...</code>';
      testApiBtn.disabled = true;

      setTimeout(() => {
        let payloadObj = {};
        try {
          payloadObj = JSON.parse(apiPayload.value);
        } catch(e) {
          payloadObj = { merchantId: "MERCHANT_89201", amount: 1500.00 };
        }

        const txnId = "TXN_" + Math.random().toString(36).substring(2, 10).toUpperCase();
        const fakeHmac = "sha256_" + Math.random().toString(36).substring(2, 18);

        const responseObj = {
          statusCode: 200,
          success: true,
          timestamp: new Date().toISOString(),
          data: {
            transactionId: txnId,
            merchantId: payloadObj.merchantId || "MERCHANT_89201",
            amount: payloadObj.amount || 1500.00,
            currency: payloadObj.currency || "INR",
            status: "INITIATED",
            gatewayReference: "KOTAK_UPI_" + Math.floor(100000 + Math.random() * 900000),
            security: {
              signature: fakeHmac,
              idempotencyKeyVerified: true
            }
          },
          message: "Payment request successfully initiated via Jigropay Gateway Engine."
        };

        apiResponse.innerHTML = `<code>${JSON.stringify(responseObj, null, 2)}</code>`;
        testApiBtn.disabled = false;
      }, 900);
    });
  }

  /* ── 9. CONTACT FORM HANDLER ────────────── */
  window.handleFormSubmit = function(event) {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const successMsg = document.getElementById('formSuccess');

    btn.disabled = true;
    btnText.textContent = 'Sending Message...';

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      successMsg.style.display = 'block';
      document.getElementById('contactForm').reset();

      setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
    }, 1200);
  };

  /* ── 10. SMOOTH SCROLL ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 75;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── 12. BLOG FILTERING & SEARCH ────────── */
  const blogSearchInput = document.getElementById('blogSearchInput');
  const filterTags = document.querySelectorAll('.filter-tag');
  const blogCards = document.querySelectorAll('.blog-card');

  if (blogSearchInput || filterTags.length > 0) {
    let activeTag = 'all';

    const filterArticles = () => {
      const query = blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '';

      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const keywords = card.getAttribute('data-keywords') || '';
        const title = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';

        const matchesTag = activeTag === 'all' || category === activeTag;
        const matchesQuery = query === '' || keywords.includes(query) || title.includes(query);

        if (matchesTag && matchesQuery) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeTag = tag.getAttribute('data-tag');
        filterArticles();
      });
    });

    if (blogSearchInput) {
      blogSearchInput.addEventListener('input', filterArticles);
    }
  }

  /* ── 13. BLOG ARTICLE MODAL READER ─────── */
  const blogArticlesData = {
    'post-1': {
      title: 'Building Bank-Grade Webhook Verification in ASP.NET Core with HMAC-SHA256',
      badge: 'FinTech Security',
      date: 'July 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge fintech">FinTech Security</span>
          <h2>Building Bank-Grade Webhook Verification in ASP.NET Core with HMAC-SHA256</h2>
          <p><em>Published on July 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>When operating a payment platform handling UPI Pay-ins or IMPS/NEFT Payout callbacks, webhooks are the primary mechanism for receiving real-time transaction updates from bank servers (such as Kotak Mahindra Bank, Payol, or SafePay).</p>
          <p>Because webhooks are transmitted across public networks, securing them against <strong>Man-in-the-Middle (MITM) attacks, payload tampering, and replay attacks</strong> is non-negotiable.</p>
          <h3>1. HMAC Signature Verification Middleware</h3>
          <p>HMAC (Hash-based Message Authentication Code) ensures that payload contents cannot be altered without invalidating the secret signature key.</p>
          <pre><code>public class HmacValidationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly string _secretKey;

    public HmacValidationMiddleware(RequestDelegate next, IConfiguration config)
    {
        _next = next;
        _secretKey = config["PaymentGateway:WebhookSecret"];
    }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Request.EnableBuffering();
        using var reader = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true);
        var body = await reader.ReadToEndAsync();
        context.Request.Body.Position = 0;

        if (!context.Request.Headers.TryGetValue("X-Signature", out var headerSignature))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("Missing signature header");
            return;
        }

        var computedSig = ComputeHmacSha256(body, _secretKey);
        if (!CryptographicOperations.FixedTimeEquals(
            Encoding.UTF8.GetBytes(computedSig),
            Encoding.UTF8.GetBytes(headerSignature)))
        {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync("Invalid HMAC Signature");
            return;
        }

        await _next(context);
    }
}</code></pre>
          <h3>2. Idempotency Key Handling</h3>
          <p>Banks frequently retry webhook notifications when network timeouts occur. Implementing an <code>X-Idempotency-Key</code> cache using Redis or SQL Server prevents duplicate debit/credit entries for the same transaction ID.</p>
        </div>
      `
    },
    'post-2': {
      title: 'Why We Chose Dapper Over Entity Framework Core for FinTech Transaction Processing',
      badge: 'SQL & Dapper',
      date: 'June 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge database">SQL & Dapper</span>
          <h2>Why We Chose Dapper Over Entity Framework Core for FinTech Transaction Processing</h2>
          <p><em>Published on June 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>While Entity Framework Core provides excellent Developer Experience (DX) for rapid CRUD development, financial payment systems demand <strong>predictable execution plans, zero-allocation serialization, and raw query speed</strong>.</p>
          <h3>Benchmark Comparison</h3>
          <p>In our benchmarks handling 50,000 transaction records:</p>
          <ul>
            <li><strong>Dapper:</strong> 142ms total execution time, 4.2 MB RAM allocated.</li>
            <li><strong>EF Core (Tracking):</strong> 680ms total execution time, 28.5 MB RAM allocated.</li>
            <li><strong>EF Core (AsNoTracking):</strong> 310ms total execution time, 12.1 MB RAM allocated.</li>
          </ul>
          <h3>Conclusion</h3>
          <p>By pairing Dapper with SQL Server stored procedures, we eliminated Garbage Collection (GC) pressure spikes during peak transaction hours.</p>
        </div>
      `
    },
    'post-3': {
      title: 'Structuring Enterprise .NET Core Solutions: CQRS & MediatR in Practice',
      badge: 'Clean Architecture',
      date: 'May 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge architecture">Clean Architecture</span>
          <h2>Structuring Enterprise .NET Core Solutions: CQRS & MediatR in Practice</h2>
          <p><em>Published on May 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>Clean Architecture separates application business rules from infrastructure mechanisms. By decoupling API Controllers into isolated <code>Commands</code> and <code>Queries</code>, codebase complexity remains manageable as projects grow.</p>
          <h3>Command Handler Pattern Example</h3>
          <pre><code>public record InitiatePayinCommand(
    string MerchantId,
    decimal Amount,
    string CustomerVpa
) : IRequest&lt;PayinResult&gt;;

public class InitiatePayinHandler : IRequestHandler&lt;InitiatePayinCommand, PayinResult&gt;
{
    private readonly IPaymentGatewayRepository _repo;
    public InitiatePayinHandler(IPaymentGatewayRepository repo) =&gt; _repo = repo;

    public async Task&lt;PayinResult&gt; Handle(InitiatePayinCommand cmd, CancellationToken ct)
    {
        // 1. Business Validation
        // 2. Call Bank Gateway API
        // 3. Persist State via Dapper
        return await _repo.CreateTransactionAsync(cmd);
    }
}</code></pre>
          <p>This approach ensures every handler is independently unit testable using xUnit and Moq without initializing full HTTP pipelines.</p>
        </div>
      `
    },
    'post-4': {
      title: 'Top 5 Performance Optimizations in .NET 8 for Low-Latency Microservices',
      badge: '.NET Core 8',
      date: 'April 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge netcore">.NET Core 8</span>
          <h2>Top 5 Performance Optimizations in .NET 8 for Low-Latency Microservices</h2>
          <p><em>Published on April 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>In high-throughput microservices (such as financial payment engines and transaction routers), milliseconds matter. Microsoft .NET 8 introduced game-changing runtime and language optimizations that drastically reduce latency and memory footprints.</p>

          <h3>1. Native AOT (Ahead-of-Time) Compilation</h3>
          <p>Native AOT compiles C# directly into machine code instead of IL. This eliminates the JIT (Just-In-Time) compilation overhead at startup, shrinking container RSS memory footprint from <strong>180 MB down to 24 MB</strong> and enabling sub-15ms cold starts in serverless/K8s pods.</p>
          <pre><code>&lt;PropertyGroup&gt;
  &lt;PublishAot&gt;true&lt;/PublishAot&gt;
  &lt;OptimizationPreference&gt;Speed&lt;/OptimizationPreference&gt;
&lt;/PropertyGroup&gt;</code></pre>

          <h3>2. System.Threading.Channels for Lock-Free Async Queues</h3>
          <p>Instead of using heavy thread locks or blocking queues, <code>Channel.CreateBounded&lt;T&gt;</code> provides a high-speed, zero-allocation producer-consumer queue for background transaction processing.</p>
          <pre><code>var channel = Channel.CreateBounded&lt;PaymentNotification&gt;(new BoundedChannelOptions(5000)
{
    FullMode = BoundedChannelFullMode.Wait,
    SingleReader = true,
    SingleWriter = false
});

// Producer
await channel.Writer.WriteAsync(notification);

// Consumer Loop
await foreach (var item in channel.Reader.ReadAllAsync(cancellationToken))
{
    await ProcessPaymentAsync(item);
}</code></pre>

          <h3>3. Memory & Byte Buffer Recycling with ArrayPool&lt;T&gt;</h3>
          <p>Allocating new <code>byte[]</code> arrays for every incoming HTTP request causes Garbage Collection (GC) pauses. Reusing buffers via <code>ArrayPool&lt;byte&gt;.Shared</code> eliminates Gen 0 GC churn.</p>
          <pre><code>byte[] buffer = ArrayPool&lt;byte&gt;.Shared.Rent(4096);
try
{
    int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
    ProcessBuffer(buffer.AsSpan(0, bytesRead));
}
finally
{
    ArrayPool&lt;byte&gt;.Shared.Return(buffer);
}</code></pre>

          <h3>4. ValueTask&lt;T&gt; for Synchronous Hot Paths</h3>
          <p>When an async method completes synchronously 90% of the time (e.g., fetching a cached token or routing rule), returning <code>ValueTask&lt;T&gt;</code> avoids allocating a <code>Task</code> object on the heap.</p>

          <h3>5. FrozenDictionary&lt;TKey, TValue&gt; for Zero-Lookup Overhead</h3>
          <p>.NET 8 introduced <code>System.Collections.Frozen</code>. Once initialized, <code>FrozenDictionary</code> optimizes hash lookup paths for read-heavy operations like API routing tables or currency exchange configuration lookups.</p>
          <pre><code>private static readonly FrozenDictionary&lt;string, BankGatewayConfig&gt; GatewayConfigs = 
    FetchConfigsFromDb().ToFrozenDictionary(x =&gt; x.Code, StringComparer.OrdinalIgnoreCase);</code></pre>
        </div>
      `
    },
    'post-5': {
      title: 'Designing Automated Bank Reconciliation Engines in C#',
      badge: 'FinTech Architecture',
      date: 'March 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge fintech">FinTech Architecture</span>
          <h2>Designing Automated Bank Reconciliation Engines in C#</h2>
          <p><em>Published on March 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>Bank reconciliation is the process of matching internal database transaction logs against daily bank account statements (e.g., Kotak Mahindra Bank statement files in CSV/MT940 formats).</p>
          <h3>Key Architecture Components</h3>
          <ul>
            <li><strong>Automated Statement Parser:</strong> Stream-based parsing of large bank MT940/CSV statements.</li>
            <li><strong>3-Way Matching Rules:</strong> Matching by UTR (Unique Transaction Reference), Bank Ref Number, and exact Amount tolerance.</li>
            <li><strong>Discrepancy Exception Queue:</strong> Flagging un-reconciled items for manual review.</li>
          </ul>
        </div>
      `
    },
    'post-6': {
      title: 'Eliminating SQL Server Deadlocks in High-Concurrency Financial Databases',
      badge: 'Database Tuning',
      date: 'February 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge database">Database Tuning</span>
          <h2>Eliminating SQL Server Deadlocks in High-Concurrency Financial Databases</h2>
          <p><em>Published on February 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>When thousands of concurrent payment callbacks update merchant wallet balances simultaneously, database deadlocks can stall transaction processing.</p>
          <h3>Key Solutions</h3>
          <ul>
            <li>Enabling <code>READ_COMMITTED_SNAPSHOT</code> (RCSI) isolation level on SQL Server database.</li>
            <li>Consistent table access order in stored procedures (always locking Merchant Wallet before Transaction Log).</li>
            <li>Utilizing <code>WITH (UPDLOCK, HOLDLOCK)</code> index hints for safe SELECT-for-UPDATE queries.</li>
          </ul>
        </div>
      `
    }
  };

  window.openBlogModal = function(postId) {
    const modalBackdrop = document.getElementById('blogModalBackdrop');
    const modalContent = document.getElementById('blogModalContent');
    const articleData = blogArticlesData[postId] || {
      title: 'Technical Article Details',
      content: '<div class="blog-article-body"><h2>Article Content</h2><p>Full article coming soon!</p></div>'
    };

    if (modalBackdrop && modalContent) {
      modalContent.innerHTML = articleData.content;
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeBlogModal = function() {
    const modalBackdrop = document.getElementById('blogModalBackdrop');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  const modalBackdrop = document.getElementById('blogModalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeBlogModal();
    });
  }

  console.log('%c👋 Hi! Welcome to Suraj Prajapati\'s Portfolio & .NET Blog', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
});

