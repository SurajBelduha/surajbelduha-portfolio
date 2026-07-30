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
  const gatewaySelector = document.getElementById('gatewaySelector');
  const apiEndpointText = document.getElementById('apiEndpointText');

  const gatewayTemplates = {
    upipayin: {
      endpoint: '/api/v1/payment/upi/initiate',
      payload: `{\n  // [PARAM] merchantId: Unique merchant ID registered in FinTech platform\n  "merchantId": "MERCHANT_PAY_89201",\n  // [PARAM] amount: Transaction amount in INR\n  "amount": 1500.00,\n  // [PARAM] currency: ISO 4217 Currency Code\n  "currency": "INR",\n  // [PARAM] paymentMethod: Channel (UPI | IMPS | NEFT)\n  "paymentMethod": "UPI",\n  // [PARAM] customerVpa: Customer Virtual Payment Address\n  "customerVpa": "user@upi",\n  // [PARAM] callbackUrl: Webhook URL for async notification\n  "callbackUrl": "https://merchant.com/api/v1/webhook"\n}`
    },
    impspayout: {
      endpoint: '/api/v1/payout/disburse',
      payload: `{\n  // [PARAM] merchantId: Payout merchant account identifier\n  "merchantId": "MERCHANT_PAYOUT_77102",\n  // [PARAM] amount: Payout disbursement value\n  "amount": 5000.00,\n  // [PARAM] beneficiaryAccount: Bank Account Number\n  "beneficiaryAccount": "918029381920",\n  // [PARAM] ifscCode: Bank Branch IFSC Code\n  "ifscCode": "BANK0000181",\n  // [PARAM] payoutMode: IMPS | NEFT | RTGS\n  "payoutMode": "IMPS",\n  // [PARAM] callbackUrl: Webhook status update URL\n  "callbackUrl": "https://merchant.com/api/v1/payout-webhook"\n}`
    },
    cardcharge: {
      endpoint: '/api/v1/payment/card-charge',
      payload: `{\n  // [PARAM] merchantId: Merchant Account Code\n  "merchantId": "MERCHANT_CARD_3391",\n  // [PARAM] amount: Charge Amount\n  "amount": 2999.00,\n  // [PARAM] cardToken: Encrypted Payment Card Token\n  "cardToken": "tok_visa_safe_99182",\n  // [PARAM] cvvVerified: 3D Secure Verification Flag\n  "cvvVerified": true,\n  // [PARAM] callbackUrl: Webhook notification endpoint\n  "callbackUrl": "https://merchant.com/api/v1/card-webhook"\n}`
    }
  };

  if (gatewaySelector && apiPayload && apiEndpointText) {
    gatewaySelector.addEventListener('change', (e) => {
      const selected = gatewayTemplates[e.target.value] || gatewayTemplates.upipayin;
      apiEndpointText.textContent = selected.endpoint;
      apiPayload.value = selected.payload;
    });
  }

  if (testApiBtn && apiResponse) {
    testApiBtn.addEventListener('click', () => {
      apiResponse.innerHTML = '<code>Processing request in .NET Core 8 Web API...</code>';
      testApiBtn.disabled = true;

      setTimeout(() => {
        const selectedGw = gatewaySelector ? gatewaySelector.value : 'upipayin';
        const txnId = "TXN_" + Math.random().toString(36).substring(2, 10).toUpperCase();
        const bankRrn = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const fakeHmac = "sha256_" + Math.random().toString(36).substring(2, 22);

        let responseObj = {};

        if (selectedGw === 'upipayin') {
          responseObj = {
            statusCode: 200,
            success: true,
            timestamp: new Date().toISOString(),
            data: {
              transactionId: txnId, // [PARAM] Platform reference
              merchantId: "MERCHANT_PAY_89201", // [PARAM] Verified Merchant
              amount: 1500.00, // [PARAM] Final processed amount
              currency: "INR", // [PARAM] Currency
              bankReferenceNo: bankRrn, // [PARAM] Bank 12-digit RRN
              status: "SUCCESS", // [PARAM] Payment Status
              gatewayLatencyMs: Math.floor(80 + Math.random() * 60), // [PARAM] Turnaround time in ms
              security: {
                signature: fakeHmac, // [PARAM] HMAC-SHA256 hash for validation
                idempotencyVerified: true // [PARAM] Anti-duplicate flag
              }
            },
            message: "Payment successfully processed via Primary Bank Gateway."
          };
        } else if (selectedGw === 'impspayout') {
          responseObj = {
            statusCode: 200,
            success: true,
            timestamp: new Date().toISOString(),
            data: {
              payoutId: txnId, // [PARAM] Payout System Reference
              merchantId: "MERCHANT_PAYOUT_77102",
              disbursedAmount: 5000.00,
              utrNumber: "UTR" + bankRrn, // [PARAM] Bank UTR Number
              payoutMode: "IMPS",
              status: "DISBURSED", // [PARAM] Instant Disbursal Status
              gatewayLatencyMs: Math.floor(110 + Math.random() * 80),
              security: {
                signature: fakeHmac,
                idempotencyVerified: true
              }
            },
            message: "IMPS Payout successfully disbursed via Payout Channel."
          };
        } else {
          responseObj = {
            statusCode: 200,
            success: true,
            timestamp: new Date().toISOString(),
            data: {
              chargeId: txnId,
              merchantId: "MERCHANT_CARD_3391",
              chargedAmount: 2999.00,
              authCode: "AUTH_" + Math.floor(100000 + Math.random() * 900000), // [PARAM] Card Auth Code
              status: "CAPTURED",
              gatewayLatencyMs: Math.floor(95 + Math.random() * 50),
              security: {
                signature: fakeHmac,
                idempotencyVerified: true
              }
            },
            message: "Card charge successfully captured via Secure Card Gateway."
          };
        }

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
    },
    'post-7': {
      title: 'Understanding Singleton, Scoped, and Transient Lifetimes in .NET 8',
      badge: '.NET Core 8',
      date: 'January 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge netcore">.NET Core 8</span>
          <h2>Understanding Singleton, Scoped, and Transient Lifetimes in .NET 8</h2>
          <p><em>Published on January 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />

          <p>Dependency Injection (DI) is a core design pattern in ASP.NET Core used to achieve Inversion of Control (IoC). When registering a service in the DI container, you must specify its <strong>service lifetime</strong>.</p>
          
          <div style="background:var(--bg-alt); padding:16px; border-radius:var(--radius-sm); margin:16px 0; border:1px solid var(--border);">
            <strong>📌 What You Will Learn:</strong>
            <ul style="margin: 8px 0 0 20px; font-size:.9rem;">
              <li>Difference between Transient, Scoped, and Singleton lifetimes.</li>
              <li>Real-life analogies to easily remember each lifetime.</li>
              <li>Code example proving how object GUIDs change across scopes.</li>
              <li>What Captive Dependencies are and how to avoid them.</li>
            </ul>
          </div>

          <h3>1. Transient Lifetime (AddTransient)</h3>
          <p><strong>Analogy:</strong> Disposable paper coffee cups — every time a customer orders coffee, a brand-new paper cup is created, used once, and thrown away.</p>
          <p>A new instance is created <em>every single time</em> the service is requested from the DI container, even within the same HTTP request.</p>
          <pre><code>// Good for lightweight, stateless processing services
builder.Services.AddTransient&lt;IEmailValidator, EmailValidator&gt;();</code></pre>

          <h3>2. Scoped Lifetime (AddScoped)</h3>
          <p><strong>Analogy:</strong> A customer tray at a restaurant — shared throughout your single meal, but discarded when you finish and leave.</p>
          <p>A single instance is created <em>once per HTTP request scope</em>. All components invoked during that HTTP request share the exact same instance.</p>
          <pre><code>// Essential for DbContext, Unit of Work, and User Context per HTTP request
builder.Services.AddScoped&lt;IApplicationDbContext, ApplicationDbContext&gt;();
builder.Services.AddScoped&lt;IPaymentRepository, PaymentRepository&gt;();</code></pre>

          <h3>3. Singleton Lifetime (AddSingleton)</h3>
          <p><strong>Analogy:</strong> The main espresso machine in the coffee shop — created once when the shop opens and used by all employees for every customer all day.</p>
          <p>A single instance is created <em>once when the application starts</em> and reused across the entire application lifecycle for all users and requests.</p>
          <pre><code>// Good for thread-safe memory caches, configuration objects, and metrics
builder.Services.AddSingleton&lt;IMemoryCache, MemoryCache&gt;();</code></pre>

          <h3>Summary Comparison Table</h3>
          <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:.88rem;">
            <thead>
              <tr style="background:var(--bg-alt); border-bottom:2px solid var(--border); text-align:left;">
                <th style="padding:8px;">Lifetime</th>
                <th style="padding:8px;">Creation Frequency</th>
                <th style="padding:8px;">Typical Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border);">
                <td style="padding:8px;"><strong>Transient</strong></td>
                <td style="padding:8px;">Every time requested</td>
                <td style="padding:8px;">Stateless helpers, lightweight utilities</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border);">
                <td style="padding:8px;"><strong>Scoped</strong></td>
                <td style="padding:8px;">Once per HTTP Request</td>
                <td style="padding:8px;">DbContext, Repositories, Request User Context</td>
              </tr>
              <tr>
                <td style="padding:8px;"><strong>Singleton</strong></td>
                <td style="padding:8px;">Once per App Lifetime</td>
                <td style="padding:8px;">Memory Cache, Feature Flags, Metrics Logger</td>
              </tr>
            </tbody>
          </table>
        </div>
      `
    },
    'post-8': {
      title: 'Stop Injecting IEnumerable Just to Pick One Service in C#',
      badge: 'Clean Code',
      date: 'January 2026',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge architecture">Clean Code</span>
          <h2>Stop Injecting IEnumerable Just to Pick One Service in C#</h2>
          <p><em>Published on January 2026 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />

          <p>A common architectural anti-pattern in C# applications when supporting multiple strategies (e.g. payment gateways like Kotak, Payol, SafePay) is injecting <code>IEnumerable&lt;IPaymentGateway&gt;</code> into a processing service and choosing one via LINQ.</p>

          <h3>❌ The Bad Way: Injecting IEnumerable&lt;T&gt;</h3>
          <pre><code>// ❌ BAD: Instantiates ALL registered services on every request!
public class PaymentService
{
    private readonly IEnumerable&lt;IPaymentGateway&gt; _gateways;

    public PaymentService(IEnumerable&lt;IPaymentGateway&gt; gateways)
    {
        _gateways = gateways; // DI Container resolves ALL implementations!
    }

    public async Task ProcessPaymentAsync(string gatewayName, PaymentRequest req)
    {
        var gateway = _gateways.FirstOrDefault(g =&gt; g.Name == gatewayName);
        if (gateway == null) throw new NotSupportedException();
        await gateway.ExecuteAsync(req);
    }
}</code></pre>

          <p><strong>Why is this bad?</strong> It instantiates <em>every single payment gateway class</em> registered in DI, creating unnecessary objects, connecting to unused databases/APIs, and increasing garbage collection overhead.</p>

          <h3>✅ The Good Way 1: .NET 8 Native Keyed Services</h3>
          <p>Starting with .NET 8, C# natively supports <strong>Keyed Services</strong> using <code>AddKeyedScoped</code> and <code>[FromKeyedServices]</code> attribute:</p>

          <pre><code>// 1. Program.cs Registration
builder.Services.AddKeyedScoped&lt;IPaymentGateway, KotakGateway&gt;("Kotak");
builder.Services.AddKeyedScoped&lt;IPaymentGateway, PayolGateway&gt;("Payol");
builder.Services.AddKeyedScoped&lt;IPaymentGateway, SafePayGateway&gt;("SafePay");

// 2. Direct Resolution in API Controller / Handler
public class PaymentController : ControllerBase
{
    public async Task&lt;IActionResult&gt; Process(
        [FromKeyedServices("Kotak")] IPaymentGateway gateway, 
        PaymentRequest req)
    {
        await gateway.ExecuteAsync(req);
        return Ok();
    }
}</code></pre>

          <h3>✅ The Good Way 2: Factory Resolver Delegate</h3>
          <pre><code>// Program.cs
public delegate IPaymentGateway GatewayResolver(string name);

builder.Services.AddScoped&lt;GatewayResolver&gt;(sp =&gt; name =&gt; name switch
{
    "Kotak" =&gt; sp.GetRequiredService&lt;KotakGateway&gt;(),
    "Payol" =&gt; sp.GetRequiredService&lt;PayolGateway&gt;(),
    _ =&gt; throw new NotSupportedException($"Gateway '{name}' is not registered.")
});</code></pre>
        </div>
      `
    },
    'post-9': {
      title: 'Understanding the Builder Design Pattern in .NET',
      badge: 'Design Patterns',
      date: 'December 2025',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge patterns">Design Patterns</span>
          <h2>Understanding the Builder Design Pattern in .NET</h2>
          <p><em>Published on December 2025 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />

          <p>The <strong>Builder Pattern</strong> is a creational design pattern that allows you to construct complex objects step-by-step using a clean, readable, fluent interface.</p>

          <h3>❌ The Problem: Telescoping Constructor Anti-Pattern</h3>
          <pre><code>// ❌ Hard to read, easy to pass parameters in wrong order!
var order = new Order("ORD_101", 1500.00m, "INR", "UPI", "John", "Doe", "Mumbai", "400001", true, false);</code></pre>

          <h3>✅ The Solution: Fluent Builder Pattern in C#</h3>
          <pre><code>public class OrderBuilder
{
    private string _orderId = default!;
    private decimal _amount;
    private string _currency = "INR";
    private string _customerName = default!;
    private string _paymentMethod = "UPI";

    public OrderBuilder WithId(string orderId)
    {
        _orderId = orderId;
        return this;
    }

    public OrderBuilder WithAmount(decimal amount)
    {
        if (amount &lt;= 0) throw new ArgumentException("Amount must be greater than zero.");
        _amount = amount;
        return this;
    }

    public OrderBuilder WithCustomer(string name)
    {
        _customerName = name;
        return this;
    }

    public OrderBuilder ViaPaymentMethod(string method)
    {
        _paymentMethod = method;
        return this;
    }

    public Order Build()
    {
        // Validation logic in Build() guarantees a valid object
        if (string.IsNullOrEmpty(_orderId)) throw new InvalidOperationException("OrderId is required.");
        if (string.IsNullOrEmpty(_customerName)) throw new InvalidOperationException("Customer name is required.");

        return new Order(_orderId, _amount, _currency, _customerName, _paymentMethod);
    }
}

// Fluent Usage:
var order = new OrderBuilder()
    .WithId("ORD_101")
    .WithCustomer("Suraj Prajapati")
    .WithAmount(2500.00m)
    .ViaPaymentMethod("UPI")
    .Build();</code></pre>
        </div>
      `
    },
    'post-10': {
      title: 'Understanding the Factory Method Design Pattern in .NET',
      badge: 'Design Patterns',
      date: 'December 2025',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge patterns">Design Patterns</span>
          <h2>Understanding the Factory Method Design Pattern in .NET</h2>
          <p><em>Published on December 2025 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />

          <p>The <strong>Factory Method Pattern</strong> is a creational pattern that defines an interface for creating objects in a superclass, but lets subclasses or concrete factories decide which class to instantiate.</p>

          <h3>Real-World FinTech Scenario</h3>
          <p>Suppose your platform needs to process payments across multiple banking APIs (Kotak Mahindra, Payol, SafePay). Instead of tight coupling with <code>if/else</code> statements, use the Factory Method pattern.</p>

          <h3>Step 1: Product Interface</h3>
          <pre><code>public interface IPaymentGateway
{
    Task&lt;PaymentResult&gt; ProcessAsync(PaymentRequest request);
}</code></pre>

          <h3>Step 2: Abstract Factory & Concrete Implementations</h3>
          <pre><code>public abstract class PaymentGatewayFactory
{
    // Factory Method
    public abstract IPaymentGateway CreateGateway();

    public async Task&lt;PaymentResult&gt; ExecutePaymentAsync(PaymentRequest req)
    {
        var gateway = CreateGateway(); // Encapsulated creation logic
        return await gateway.ProcessAsync(req);
    }
}

public class KotakBankGatewayFactory : PaymentGatewayFactory
{
    public override IPaymentGateway CreateGateway() =&gt; new KotakBankGateway();
}

public class PayolGatewayFactory : PaymentGatewayFactory
{
    public override IPaymentGateway CreateGateway() =&gt; new PayolGateway();
}</code></pre>

          <p><strong>Benefits:</strong> Adheres to the <strong>Open/Closed Principle (OCP)</strong>. Adding a 7th payment gateway only requires creating a new factory class without altering existing code!</p>
        </div>
      `
    },
    'post-11': {
      title: 'Understanding the Singleton Design Pattern in .NET & Avoiding Captive Dependencies',
      badge: 'Design Patterns',
      date: 'November 2025',
      content: `
        <div class="blog-article-body">
          <span class="blog-badge patterns">Design Patterns</span>
          <h2>Understanding the Singleton Design Pattern in .NET & Avoiding Captive Dependencies</h2>
          <p><em>Published on November 2025 • By Suraj Prajapati</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />

          <p>The <strong>Singleton Pattern</strong> ensures that a class has only one instance throughout the lifetime of the application and provides a global point of access to it.</p>

          <h3>1. Thread-Safe Lazy Singleton in C#</h3>
          <pre><code>public sealed class GlobalCurrencyCache
{
    private static readonly Lazy&lt;GlobalCurrencyCache&gt; _instance = 
        new Lazy&lt;GlobalCurrencyCache&gt;(() =&gt; new GlobalCurrencyCache());

    public static GlobalCurrencyCache Instance =&gt; _instance.Value;

    private GlobalCurrencyCache()
    {
        // Private constructor prevents external instantiation
    }
}</code></pre>

          <h3>2. Beware of Captive Dependencies!</h3>
          <p>A <strong>Captive Dependency</strong> occurs when a service with a long lifetime (e.g. Singleton) holds onto a service with a shorter lifetime (e.g. Scoped <code>DbContext</code>).</p>
          
          <pre><code>// ❌ BAD: Captive Dependency! DbContext is kept alive forever!
public class MetricCollectorService // Singleton
{
    private readonly ApplicationDbContext _db; // Scoped DbContext!
    public MetricCollectorService(ApplicationDbContext db)
    {
        _db = db;
    }
}

// ✅ GOOD SOLUTION: Inject IServiceScopeFactory in Singleton
public class MetricCollectorService
{
    private readonly IServiceScopeFactory _scopeFactory;

    public MetricCollectorService(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public async Task SaveMetricAsync(MetricLog log)
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService&lt;ApplicationDbContext&gt;();
        db.Metrics.Add(log);
        await db.SaveChangesAsync();
    }
}</code></pre>
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

  /* ── 14. PROJECTS PAGE SEARCH & CATEGORY FILTER ── */
  const projectSearchInput = document.getElementById('projectSearchInput');
  const projectFilterTags = document.querySelectorAll('#projectFilterTags .filter-tag');
  const projectCards = document.querySelectorAll('#projectsPageGrid .project-card');

  if (projectSearchInput || projectFilterTags.length > 0) {
    let activeCat = 'all';

    const filterProjects = () => {
      const query = projectSearchInput ? projectSearchInput.value.toLowerCase().trim() : '';

      projectCards.forEach(card => {
        const category = card.getAttribute('data-cat');
        const stack = card.getAttribute('data-stack') || '';
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';

        const matchesCat = activeCat === 'all' || category === activeCat;
        const matchesQuery = query === '' || stack.includes(query) || title.includes(query);

        if (matchesCat && matchesQuery) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    };

    projectFilterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        projectFilterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        activeCat = tag.getAttribute('data-cat');
        filterProjects();
      });
    });

    if (projectSearchInput) {
      projectSearchInput.addEventListener('input', filterProjects);
    }
  }

  /* ── 15. PROJECT CASE STUDY MODAL READER ────── */
  const projectCaseStudies = {
    'proj-1': {
      title: 'Jigropay — FinTech Merchant Payment Engine',
      content: `
        <div class="blog-article-body">
          <span class="project-badge featured-badge">Flagship FinTech Engine</span>
          <h2>Jigropay — Merchant Payment Platform</h2>
          <p><em>Built with .NET Core 8, Dapper, SQL Server, C#, React, and REST APIs</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <h3>System Architecture Highlights</h3>
          <ul>
            <li><strong>6 Payment Gateway Integrations:</strong> Kotak Mahindra Bank, Payol, SolitPay, SafePay India, Brezatech, and DiasPay.</li>
            <li><strong>Pay-in & Payout Channels:</strong> Supports UPI, Net Banking, Debit/Credit Cards, IMPS, NEFT, and RTGS operations.</li>
            <li><strong>Bank Reconciliation:</strong> Automated daily Kotak Bank statement reconciliation pipeline to catch un-matched transactions.</li>
            <li><strong>HMAC Webhook Protection:</strong> HMAC-SHA256 signature generation & verification with strict idempotency keys to prevent duplicate transactions.</li>
          </ul>
          <h3>Key Achievements</h3>
          <p>Handled thousands of concurrent merchant transaction callbacks with 99.99% uptime and zero duplicate payout executions.</p>
        </div>
      `
    },
    'proj-2': {
      title: 'Resource Management System (RMS)',
      content: `
        <div class="blog-article-body">
          <span class="project-badge">Enterprise HR</span>
          <h2>Resource Management System (RMS)</h2>
          <p><em>Built with ASP.NET Core, React, SQL Server, and EF Core</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>Complete enterprise HR & Payroll platform for managing employee lifecycle, attendance, leaves, salary slips generation, and client invoicing.</p>
        </div>
      `
    },
    'proj-6': {
      title: 'AQHR — HR Payroll System',
      content: `
        <div class="blog-article-body">
          <span class="project-badge">HR & Payroll</span>
          <h2>AQHR — HR Payroll System</h2>
          <p><em>Built with ASP.NET Core, C#, SQL Server, and JavaScript</em></p>
          <hr style="border-color:var(--border); margin: 16px 0;" />
          <p>Human resource and payroll management system featuring employee profile management, attendance tracking, monthly salary calculations, and statutory compliance reporting modules.</p>
        </div>
      `
    }
  };

  window.openProjectModal = function(projId) {
    const backdrop = document.getElementById('projectModalBackdrop');
    const content = document.getElementById('projectModalContent');
    const study = projectCaseStudies[projId] || {
      title: 'Project Case Study',
      content: '<div class="blog-article-body"><h2>Case Study Details</h2><p>Case study coming soon!</p></div>'
    };

    if (backdrop && content) {
      content.innerHTML = study.content;
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeProjectModal = function() {
    const backdrop = document.getElementById('projectModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) closeProjectModal();
    });
  }

  console.log('%c👋 Hi! Welcome to Suraj Prajapati\'s Portfolio, Projects & .NET Blog', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
});


