// Kapitel-Inhalte Teil 1 (HTML-Fragmente). Bewusst nah am freigegebenen Text.
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const SVG_HK = fs.readFileSync(path.join(REPO, 'assets/images/hintere-kette.svg'), 'utf8');

// Bild-Platzhalter (Foto folgt) mit Bildunterschrift
function bild(caption) {
  return `<figure class="bild">
    <div class="bild-box"><span class="bild-ic">&#128247;</span><span class="bild-note">Foto folgt</span></div>
    <figcaption>${caption}</figcaption>
  </figure>`;
}
// "Häufiger Fehler"-Box
function fehler(text) {
  return `<div class="fehler"><span class="fehler-tag">Häufiger Fehler</span><p>${text}</p></div>`;
}
// Hinweis/Callout (blau)
function hinweis(title, text) {
  return `<div class="hinweis">${title ? `<span class="hinweis-tag">${title}</span>` : ''}<p>${text}</p></div>`;
}

const TOC = [
  { id:'kap1', teil:'Teil 1 · Grundlagen', kicker:'Kapitel 1', title:'Vorwort & wie du dieses Buch nutzt', find:'wie du dieses Buch nutzt' },
  { id:'kap2', kicker:'Kapitel 2', title:'Warum Kettlebell-Training wirkt', find:'Warum Kettlebell-Training wirkt' },
  { id:'kap3', kicker:'Kapitel 3', title:'Der Hip-Hinge: die Wurzel fast aller Übungen', find:'die Wurzel fast aller' },
  { id:'kap4', kicker:'Kapitel 4', title:'Atmung, Core-Bracing & Körperspannung', find:'Core-Bracing &' },
  { id:'kap5', kicker:'Kapitel 5', title:'Griff, Sicherheit & das richtige Gewicht', find:'das richtige Gewicht' },
];

function opener(ch) {
  return `<section class="chapter" id="${ch.id}">
    <header class="ch-head">
      ${ch.teil ? `<div class="ch-teil">${ch.teil}</div>` : ''}
      <div class="ch-kicker">${ch.kicker}</div>
      <h1 class="ch-title">${ch.title}</h1>
      <div class="ch-rule"></div>
    </header>`;
}

const K1 = opener(TOC[0]) + `
  ${bild('Ganzseitiges Kapitel-Startbild – Samuel in ruhiger, kontrollierter Kettlebell-Position, aufgeräumter Hintergrund, hochwertig.')}
  <h2>Vorwort</h2>
  <p class="drop"><strong>Du hast schon oft angefangen.</strong></p>
  <p>Das Gym-Abo. Die Lauf-App. Der Montag, an dem diesmal wirklich alles anders werden sollte. Und dann – zu wenig Zeit, die Halle zu voll, kein klarer Plan, und ehrlich: keinen Spaß gemacht – ist es wieder eingeschlafen. Nicht einmal. Immer wieder.</p>
  <p>Das liegt nicht an deiner Disziplin. Es liegt am System. Etwas, das dreimal die Woche eine Stunde Anfahrt, Umkleide und Wartezeit auf das Gerät kostet, hält kein voller Alltag lange durch.</p>
  <p>Genau das war auch mein Punkt. Ich habe es satt gehabt, mein Training von vollen Hallen, Öffnungszeiten und einer Mitgliedschaft abhängig zu machen. Was ich gesucht habe, war das Gegenteil: <strong>maximaler Effekt bei minimalem Aufwand.</strong> Gefunden habe ich es in der Kettlebell.</p>
  <p>Denn was du wirklich brauchst, ist überschaubar: <strong>zwei Kettlebells und eine Matte.</strong> Kein Studio, keine Mitgliedschaft, keine Anfahrt. Du trainierst zuhause, wann es in deinen Tag passt – <strong>20 bis 30 Minuten, 3 bis 4 Mal die Woche.</strong> Kurz genug, dass du es wirklich durchziehst. Und genau da entscheidet sich Fortschritt: nicht in der perfekten Einheit, sondern in der, die du <strong>konstant</strong> machst.</p>
  <p>Dabei ist die Kettlebell kein Kompromiss, sondern erstaunlich komplett. Sie baut <strong>Kraft</strong> auf – und fordert gleichzeitig deine <strong>Kondition</strong>: So wie Laufen dein Herz-Kreislauf-System belastet, bringen dich durchgehende Swings in hohe Herzfrequenzbereiche, Ausdauertraining, ohne einen Schritt zu laufen. Cleans, Snatches und tiefe Squats bewegen deine <strong>Gelenke über den vollen Radius</strong> und kräftigen die Muskulatur drumherum – Beweglichkeit und Stabilität in einem.</p>
  <p>Ein Werkzeug, wenig Zeit, ein klares System – und Training, das du endlich durchhältst.</p>
  <p>Was ich dir <strong>nicht</strong> verspreche: eine Abkürzung. Keine „In-3-Tagen-fit"-Wunder, keine Bro-Science, keine Geheimtricks. Was du bekommst, ist Handwerk – Schritt für Schritt erklärt, ehrlich, und so aufgebaut, dass du am Ende nicht von mir abhängig bist, sondern dein Training selbst verstehst und steuerst.</p>
  <p>Wenn du bereit bist, Technik geduldig zu üben, bevor das Gewicht steigt, bist du hier goldrichtig.</p>

  <h2>Für wen dieses Buch ist</h2>
  <ul class="ticks">
    <li><strong>Du hast schon oft angefangen, aber nie durchgehalten</strong> – weil dir Zeit und ein klares System gefehlt haben. Genau das bekommst du hier.</li>
    <li><strong>Kompletter Einsteiger:</strong> du lernst von Anfang an sauber, statt dir Fehler anzugewöhnen.</li>
    <li><strong>Sportler-Background:</strong> du willst explosive Kraft und Rumpfstabilität in deinen Sport übertragen.</li>
    <li><strong>Gym-Erweiterung:</strong> du suchst ein flexibles Tool für Kraft, Kondition und Zuhause-Einheiten.</li>
    <li><strong>Läufer:</strong> du willst kräftige, stabile Hüften und ein verletzungsresistenteres Fundament.</li>
  </ul>

  <h2>Wie dieses Buch aufgebaut ist</h2>
  <p>Das Buch führt dich in vier Teilen vom Fundament bis zur eigenständigen Trainingssteuerung:</p>
  <ul class="plain">
    <li><strong>Teil 1 – Grundlagen:</strong> der Hip-Hinge, Atmung und Körperspannung, Griff, Sicherheit und die richtige Gewichtswahl.</li>
    <li><strong>Teil 2 – Die Übungen:</strong> jede Grundübung in einem eigenen Kapitel – Swing, Goblet Squat, Clean, Press, Row, Windmill, Snatch, Halo. Immer nach demselben Muster: wofür sie gut ist, Aufbau, Technik Schritt für Schritt, häufige Fehler, Coaching-Hinweise und wie du sie leichter oder schwerer machst.</li>
    <li><strong>Teil 3 – Training & Umsetzung:</strong> wie du Übungen zu Komplexen verbindest, die Prinzipien dahinter, Aufwärmen, Regeneration – und ein konkreter 6-Wochen-Plan.</li>
    <li><strong>Teil 4 – Ernährung & Abschluss:</strong> eine alltagstaugliche Ernährungsgrundlage ohne Kalorienzählen, häufige Fragen und ein Glossar.</li>
  </ul>
  <p>Lies es von vorne nach hinten – für den Aufbau ist das der beste Weg. Willst du eine Übung nachschlagen, springst du über das Inhaltsverzeichnis direkt dorthin (im PDF ist jeder Eintrag anklickbar).</p>

  <h2>Wie du die Übungsbilder liest</h2>
  ${bild('Beispielhafte Bildsequenz einer Übung – drei Standbilder nebeneinander (Start / Übergang / Ende), sauber beschriftet.')}
  <p>Zu jeder Übung zeige ich dir die entscheidenden Positionen als <strong>Bildsequenz</strong>: Start, Übergang, Ende. Achte beim Nachmachen zuerst auf diese Schlüsselpositionen – nicht auf Tempo. Erst wenn die Positionen sitzen, kommt Geschwindigkeit dazu. Ein Spiegel oder eine kurze Videoaufnahme von dir hilft dir mehr als jedes Gefühl: Was sich richtig anfühlt, ist am Anfang oft noch nicht richtig.</p>

  <h2>Wichtiger Hinweis zu deiner Gesundheit</h2>
  ${hinweis('', 'Dieses Buch ersetzt keine medizinische oder physiotherapeutische Beratung. Wenn du gesundheitliche Beschwerden, Vorerkrankungen, Verletzungen oder Schmerzen hast, kläre vor Trainingsbeginn mit einem Arzt oder einer Ärztin ab, ob das Training für dich geeignet ist. Trainiere im Zweifel lieber leichter, sauberer und langsamer – Schmerz ist ein Stoppsignal, kein Zeichen von Fortschritt. Du trainierst eigenverantwortlich.')}
</section>`;

const K2 = opener(TOC[1]) + `
  ${bild('Starkes Action-Foto eines Swings in der kraftvollen Hüftstreckung (Endposition) – seitlich aufgenommen, damit die gestreckte Hüfte und die gerade Wirbelsäule klar erkennbar sind.')}
  <p>Die meisten Trainingsgeräte können eine Sache gut. Die Kettlebell kann ungewöhnlich viele Dinge <strong>gleichzeitig</strong> – und genau das macht sie so effizient. In einer einzigen Einheit trainierst du Kraft, Kondition, Explosivität und Beweglichkeit, ohne das Gerät zu wechseln. Auf wenigen Quadratmetern, in kurzer Zeit.</p>
  <p>Hier ist, was dabei tatsächlich in deinem Körper passiert – und was die Forschung dazu sagt.</p>

  <h2>Ein Werkzeug, viele Qualitäten</h2>
  <p><strong>Kraft.</strong> Übungen wie Squat, Press und Row belasten ganze Muskelketten statt einzelner Muskeln. Du baust funktionelle Kraft auf, die im Alltag und im Sport tatsächlich ankommt.</p>
  <p><strong>Kraftausdauer & Kondition.</strong> Rundenbasiertes Training – viele Wiederholungen mit kurzen Pausen – hält die Herzfrequenz oben. Du wirst nicht nur stärker, sondern auch konditionell widerstandsfähiger.</p>
  <p><strong>Explosivität.</strong> Der Hip-Hinge im Swing trainiert eine schnelle, kraftvolle Hüftstreckung – dieselbe Bewegung, die hinter Sprüngen, Sprints und Antritten steckt.</p>
  <p><strong>Beweglichkeit & Stabilität.</strong> Cleans, Snatches und tiefe Squats bewegen deine Gelenke über den vollen Radius und kräftigen die Muskulatur darum herum. Bewegen und Stabilisieren in einer Übung.</p>
  <p><strong>Rumpf & Anti-Rotation.</strong> Einarmige Übungen zwingen deinen Rumpf, der Rotation aktiv entgegenzuhalten. Der Kern wird stark und stabil – nicht durch Crunches, sondern durch echte Aufgaben.</p>
  <p><strong>Athletik & Koordination.</strong> Timing, Körperspannung und das saubere Zusammenspiel von Hüfte, Rumpf und Schulter – Fähigkeiten, die sich auf praktisch jeden Sport übertragen.</p>

  <h2>Was die Wissenschaft dazu sagt</h2>
  <p>Ich will dir hier nichts verkaufen, was nicht belegt ist. Deshalb die Fakten mit Quelle:</p>
  <p><strong>Kettlebell-Training ist echtes Ausdauertraining.</strong> In einer Untersuchung zur Sauerstoffaufnahme beim Swing erreichten die Teilnehmer über eine 12-minütige Swing-Belastung im Schnitt rund <strong>65 % ihrer VO&#8322;max</strong> und etwa <strong>87 % der maximalen Herzfrequenz</strong> (Farrar et al., 2010). Zum Vergleich: Das ist ein Bereich, wie ihn auch zügiges Laufen erzeugt – nur ohne einen Schritt zu laufen. Passend dazu zeigte eine weitere Studie, dass bereits <strong>vier Wochen</strong> intervallartiges Kettlebell-Training die maximale Sauerstoffaufnahme (VO&#8322;max) steigern (Falatic et al., 2015).</p>
  <p><strong>Es macht messbar stärker und explosiver.</strong> Sechs Wochen Swing-Training (zweimal pro Woche) verbesserten bei den Teilnehmern sowohl die <strong>Maximalkraft</strong> als auch die <strong>explosive Kraft</strong> (Lake & Lauder, 2012).</p>
  <p><strong>Es trainiert gezielt die hintere Kette.</strong> Der Swing aktiviert vor allem Gesäß, hintere Oberschenkel und Rückenstrecker und schult so die kraftvolle Hüftstreckung. Varianten wie der „bottoms-up"-Carry erzeugen zusätzlich eine besonders hohe Rumpfaktivierung (McGill & Marshall, 2012).</p>
  <p><strong>Aber – und das ist mir wichtig:</strong> Kettlebell-Training ist kein Wundermittel, das alles andere schlägt. In einem direkten Vergleich verbesserten sowohl Kettlebell- als auch klassisches Gewichthebertraining Kraft und Sprungkraft, wobei das Gewichthebertraining in einzelnen Messwerten sogar vorne lag (Otto et al., 2012). Die ehrliche Botschaft lautet also nicht „Kettlebell ist überlegen", sondern: Die Kettlebell ist ein <strong>wirksames und außergewöhnlich effizientes</strong> Werkzeug – besonders dann, wenn Zeit, Platz und Ausrüstung begrenzt sind.</p>

  <figure class="svgfig">${SVG_HK}<figcaption>Abb.: Die hintere Kette im Hip-Hinge – Gesäß, hintere Oberschenkel und Rückenstrecker arbeiten zusammen.</figcaption></figure>

  <h2>Der eigentliche Hebel: Konstanz</h2>
  <p>So gut diese Effekte sind – keiner davon entsteht in einer einzigen Einheit. Sie entstehen über <strong>Wochen konstanten Trainings</strong>. Und genau hier spielt die Kettlebell ihren größten Vorteil aus: Ein Training, das kurz ist, zuhause funktioniert und keine Ausreden zulässt, ziehst du eher durch als jedes perfekte Programm, das an vollen Hallen und langer Anfahrt scheitert. Die beste Methode ist die, die du <strong>wirklich machst.</strong></p>

  ${hinweis('Quellen zu diesem Kapitel', 'Farrar, Mayhew & Koch (2010), <em>J Strength Cond Res, 24</em>(4), 1034–1036. · Falatic et al. (2015), <em>J Strength Cond Res, 29</em>(7), 1943–1947. · Lake & Lauder (2012), <em>J Strength Cond Res, 26</em>(8), 2228–2233. · McGill & Marshall (2012), <em>J Strength Cond Res, 26</em>(1), 16–27. · Otto, Coburn, Brown & Spiering (2012), <em>J Strength Cond Res, 26</em>(5), 1199–1202.')}
</section>`;

const K3 = opener(TOC[2]) + `
  ${bild('Seitenansicht der Hip-Hinge-Endposition (vorgebeugt) – Hüfte weit nach hinten, Schienbeine fast senkrecht, Rücken gerade. Daneben zum Vergleich dieselbe Person im Squat (Hüfte tief, Oberkörper aufrechter).')}
  <p>Wenn du in diesem Buch nur <strong>eine</strong> Sache wirklich lernst, dann diese. Der Hip-Hinge – das Scharnier in der Hüfte – steckt im Swing, im Clean, im Snatch, im Row und in der Kreuzheben-Bewegung des Alltags, wenn du etwas vom Boden hebst. Beherrschst du den Hinge, beherrschst du die halbe Kettlebell-Welt. Verstehst du ihn nicht, wird jede dieser Übungen früher oder später deinen unteren Rücken bestrafen.</p>
  <p>Die gute Nachricht: Der Hinge ist keine Frage von Talent. Er ist eine Frage von Übung – und von ein paar simplen Bildern im Kopf.</p>

  <h2>Hinge ist nicht Squat</h2>
  <p>Das ist der häufigste Denkfehler überhaupt, deshalb gleich zu Beginn:</p>
  <ul class="plain">
    <li>Beim <strong>Squat (Kniebeuge)</strong> gehst du in die Hocke. Die Knie beugen sich stark, die Hüfte sinkt nach <strong>unten</strong>, der Oberkörper bleibt relativ aufrecht.</li>
    <li>Beim <strong>Hinge (Scharnier)</strong> schiebst du die Hüfte weit nach <strong>hinten</strong>. Die Knie beugen sich nur leicht, die Schienbeine bleiben fast senkrecht, der Oberkörper neigt sich deutlich nach vorne.</li>
  </ul>
  <p class="merk">Merksatz: <strong>Squat ist runter. Hinge ist zurück.</strong></p>

  <h2>So lernst du den Hinge – Schritt für Schritt</h2>
  ${bild('Wand-Drill – Person steht mit dem Rücken zur Wand (ca. eine Fußlänge entfernt) und tippt mit dem Gesäß nach hinten an die Wand.')}
  <ol class="steps">
    <li><strong>Der Wand-Drill (Gefühl „Hüfte nach hinten").</strong> Stell dich mit dem Rücken etwa eine Fußlänge vor eine Wand. Füße hüftbreit. Schiebe die Hüfte nach hinten, bis dein Gesäß die Wand antippt – ohne die Knie stark zu beugen. Zurück in den Stand, indem du die Hüfte nach vorne drückst. Wird es leicht, stell dich einen Schritt weiter weg.</li>
    <li><strong>Der Stab-Drill (gerader Rücken).</strong> Halte einen Besenstiel senkrecht an deinem Rücken – er berührt drei Punkte: Hinterkopf, obere Wirbelsäule, Kreuzbein. Führe den Hinge aus. Bleiben alle drei Kontaktpunkte erhalten, ist dein Rücken neutral.</li>
    <li><strong>Der Hinge ohne Hilfsmittel.</strong> Füße hüft- bis schulterbreit, Gewicht auf dem Mittelfuß. Hüfte nach hinten, Knie nur leicht gebeugt, Schienbeine nahezu senkrecht. Rücken lang, Brust „stolz", Blick schräg nach unten-vorne. So tief, wie du den geraden Rücken hältst. Hoch: Hüfte kraftvoll nach vorne, oben das Gesäß fest anspannen – nicht ins Hohlkreuz zurücklehnen.</li>
  </ol>
  <p>Zur Atmung nur so viel (Details in Kapitel 4): Vor dem Absenken einatmen und den Bauch fest machen, als würdest du einen Gürtel rundum ausfüllen. Diese Spannung schützt deinen Rücken.</p>

  <h2>Häufige Fehler</h2>
  ${bild('Fehler-Gegenüberstellung – links falsch (runder unterer Rücken beim Vorbeugen), rechts richtig (langer, gerader Rücken). Deutlich markiert.')}
  ${fehler('<strong>Du squattest, statt zu hingen.</strong> Die Knie wandern weit nach vorne, die Hüfte sinkt nach unten. Fix: Denk „Gesäß nach hinten", nicht „runter". Der Wand-Drill stellt das sofort ab.')}
  ${fehler('<strong>Runder unterer Rücken.</strong> Meist, weil du tiefer willst, als deine Beweglichkeit zulässt. Fix: Geh nur so tief, wie der Rücken gerade bleibt. Lieber flacher und sauber als tief und rund.')}
  ${fehler('<strong>Überstreckung am oberen Ende.</strong> Du lehnst dich oben zurück, die Rippen klappen auf. Fix: „Stehen heißt stehen." Gesäß anspannen, Rippen unten lassen, nicht nach hinten kippen.')}
  ${fehler('<strong>Der Blick zieht nach oben.</strong> Der Nacken überstreckt. Fix: Blick ein paar Meter schräg vor dich auf den Boden, Nacken bleibt lang.')}

  <h2>Cues, die sofort helfen</h2>
  <ul class="cues">
    <li>„Hüfte nach hinten, als würdest du eine Tür hinter dir mit dem Gesäß zudrücken."</li>
    <li>„Brust stolz, Rücken lang."</li>
    <li>„Schienbeine bleiben senkrecht."</li>
    <li>„Oben Gesäß fest – nicht zurücklehnen."</li>
  </ul>

  <h2>Selbstcheck: Sitzt dein Hinge?</h2>
  <p>Du bist bereit für den Swing (Kapitel 6), wenn du die Hüfte nach hinten schieben kannst, ohne dass die Knie stark nach vorne wandern; den Rücken über die ganze Bewegung gerade hältst; oben sauber „stehst", ohne dich zurückzulehnen; und die Bewegung 10–15 Mal ruhig und kontrolliert wiederholen kannst. Nimm dir dafür ruhig ein paar Einheiten Zeit – jede Minute hier zahlt sich in jeder folgenden Übung aus.</p>
</section>`;

const K4 = opener(TOC[3]) + `
  ${bild('Nahaufnahme Rumpf von der Seite – Hand liegt seitlich an der unteren Bauchwand, um die 360°-Spannung zu zeigen. Pfeile deuten an, wie sich der Bauch rundum weitet.')}
  <p>Im letzten Kapitel ging es darum, <em>wie</em> du dich bewegst. Jetzt geht es darum, was deinen Rücken dabei schützt und deine Kraft überhaupt erst überträgt: <strong>die Atmung und die Spannung im Rumpf.</strong> Das klingt unspektakulär – ist aber der Unterschied zwischen „mein Rücken zwickt" und „ich hebe sicher schwer".</p>
  <p>Die Idee dahinter ist simpel: Deine Wirbelsäule ist von Natur aus beweglich. Beweglich ist gut zum Bewegen – aber schlecht, wenn du eine Last hebst und die Wirbelsäule stabil bleiben soll. Also machst du sie selbst stabil. Das nennt man <strong>Bracing</strong>.</p>

  <h2>Was „Bracing" bedeutet</h2>
  <p>Bracing heißt: Du baust im Bauchraum Druck auf und spannst die Bauchwand <strong>rundum</strong> an – vorne, an den Seiten <em>und</em> hinten. Nicht Bauch einziehen, sondern Bauch <strong>fest machen.</strong> Stell dir vor, jemand würde dir gleich freundschaftlich in den Bauch boxen und du spannst dagegen.</p>
  <p>Dieser Rundum-Druck (Fachleute sprechen vom intraabdominalen Druck) versteift deinen Rumpf wie ein Korsett aus eigener Muskulatur. Das schützt den unteren Rücken – und sorgt dafür, dass die Kraft aus deiner Hüfte verlustfrei in die Kettlebell wandert, statt in einem weichen Mittelteil zu versickern. In der Rückenforschung gilt dieses aktive Verspannen als stabiler als das früher gelehrte „Bauchnabel einziehen". Ein stabiler Rumpf ist außerdem die Voraussetzung für Athletik: Erst wenn die Mitte fest ist, können Hüfte und Schultern richtig kraftvoll arbeiten.</p>

  <h2>So braced du – Schritt für Schritt</h2>
  <ol class="steps">
    <li><strong>Atme in den Bauch, nicht in die Brust.</strong> Eine Hand auf den Bauch, eine auf die Brust. Atme so ein, dass sich nur die untere Hand hebt und der Bauch sich rundum weitet – auch seitlich und in den unteren Rücken. Das ist Zwerchfellatmung.</li>
    <li><strong>Mach dich fest.</strong> Nach dem Einatmen spannst du die Bauchwand an, ohne die Luft komplett rauszulassen. Der Bauch wird hart, rundum. Das ist dein Brace.</li>
    <li><strong>Halte die Spannung – und dann bewege dich.</strong> Erst der Brace, dann die Last. Nicht andersherum.</li>
  </ol>

  <h2>Atem-Rhythmus: schwere vs. schnelle Übungen</h2>
  <ul class="plain">
    <li><strong>Langsame, schwere Übungen (Grinds)</strong> – z. B. schwerer Press oder Goblet Squat: oben einatmen, brace, und die Spannung durch den schwersten Punkt halten. Kurz nach dem kritischsten Moment kontrolliert ausatmen.</li>
    <li><strong>Schnelle, rhythmische Übungen (Ballistics)</strong> – z. B. Swing oder Snatch: im Takt der Wiederholungen atmen. Bewährt hat sich ein <strong>scharfes Ausatmen genau im Moment der Hüftstreckung</strong> (ein hörbares „tss" oben), und Einatmen, während die Kettlebell zurückpendelt.</li>
  </ul>
  ${hinweis('Wichtiger Sicherheitshinweis', 'Luft anhalten und dagegen pressen erhöht kurzfristig den Blutdruck. Wenn du Bluthochdruck, Herz-Kreislauf- oder Augenprobleme hast, halte die Luft <strong>nicht</strong> an und kläre dein Vorgehen vorher ärztlich ab. Im Zweifel: leichter, sauberer, kontrolliert weiteratmen.')}

  <h2>Häufige Fehler</h2>
  ${fehler('<strong>Bauch einziehen statt fest machen.</strong> Ein eingezogener Bauch gibt keine Rundum-Stabilität. Fix: Nicht schmal machen – hart machen. Denk an den Boxschlag.')}
  ${fehler('<strong>Die ganze Serie die Luft anhalten.</strong> Führt zu Schwindel und ist unnötig. Fix: Nur um den schwersten Punkt herum anhalten, sonst im Rhythmus atmen.')}
  ${fehler('<strong>Nur nach vorne spannen.</strong> Die Stabilität geht seitlich und hinten verloren. Fix: Bewusst 360° denken – auch seitliche Bauchwand und unterer Rücken machen mit.')}
  ${fehler('<strong>Rippen klappen beim Einatmen auf.</strong> Der Brustkorb kippt nach vorne-oben, das Kreuz geht ins Hohlkreuz. Fix: Rippen unten lassen, in den Bauch atmen statt in die Brust.')}

  <h2>Cues & Selbstcheck</h2>
  <ul class="cues">
    <li>„In den Bauch atmen, nicht in die Brust."</li>
    <li>„Fest machen, als käme gleich ein Schlag in den Bauch."</li>
    <li>„360°: vorne, seitlich, hinten."</li>
    <li>„Beim Swing: scharf ausatmen, wenn die Hüfte schnappt."</li>
  </ul>
  <p>Huste einmal kräftig und spür, wie sich deine Bauchwand automatisch rundum anspannt – <strong>genau dieses Gefühl</strong> ist dein Brace. Übe ihn erst ohne Gewicht, dann mit leichter Kettlebell, bis er automatisch kommt, bevor du dich bewegst.</p>
</section>`;

const K5 = opener(TOC[4]) + `
  ${bild('Nahaufnahme der Hand am Griff – die Stange liegt diagonal über der Handfläche (von der Daumenwurzel Richtung Zeigefingeransatz), Finger locker. Daneben dieselbe Hand in der Rack-Position (Kettlebell liegt am Unterarm an).')}
  <p>Bevor die erste richtige Übung kommt, klären wir drei praktische Dinge, die dir viel Frust und ein paar aufgerissene Handflächen ersparen: <strong>wie du greifst, wie du sicher trainierst und mit welchem Gewicht du anfängst.</strong></p>

  <h2>Der Griff</h2>
  <p>Anders als eine Hantel hat die Kettlebell ihren Schwerpunkt <strong>außerhalb</strong> der Hand – das Gewicht hängt unter oder hinter dem Griff. Deshalb greifst du sie auch anders:</p>
  <ul class="plain">
    <li><strong>Beim Swing</strong> liegt der Griff eher locker in den Fingern (fast wie ein Haken), nicht verkrampft in der Faust. Ein zu fester Griff ermüdet den Unterarm und reißt die Haut auf.</li>
    <li><strong>Beim Press und über Kopf</strong> wandert der Griff diagonal über die Handfläche: von der Daumenwurzel schräg zum Zeigefingeransatz. So liegt das Gewicht über deinem Unterarm.</li>
    <li><strong>In der Rack-Position</strong> ruht die Kugel am Unterarm und in der „Tasche" zwischen Bizeps und Brust. Das Handgelenk bleibt gerade, nicht abgeknickt.</li>
  </ul>
  <p><strong>Hände pflegen:</strong> Bildet sich Hornhaut, feile sie flach, damit sie nicht an einer Kante einreißt. Kreide hilft bei feuchten Händen, ist aber kein Muss. Reißt die Haut ein: Pause, heilen lassen, nicht auf offener Wunde weitertrainieren.</p>

  <h2>Sicherheit</h2>
  ${bild('Draufsicht auf einen sicheren Trainingsplatz – Person auf einer Matte, rundum ca. 1,5–2 m Freiraum, keine Möbel/Zerbrechliches in Reichweite.')}
  <ul class="plain">
    <li><strong>Platz:</strong> 1,5 bis 2 Meter Freiraum rundum. Beim Swing und Snatch bewegt sich das Gewicht – Möbel, Fernseher, Spiegel oder andere Menschen haben in Reichweite nichts verloren.</li>
    <li><strong>Boden & Schuhe:</strong> fester, rutschfester Untergrund. Barfuß oder in flachen, festen Schuhen stehst du am stabilsten.</li>
    <li><strong>Im Zweifel loslassen:</strong> Geht eine Wiederholung schief, kämpfe nicht – lenke die Kettlebell kontrolliert nach vorne unten weg und tritt zurück.</li>
    <li><strong>Material checken:</strong> Sitzt der Griff fest, ist die Kugel unbeschädigt?</li>
    <li><strong>Nicht kalt starten:</strong> ein paar Minuten Aufwärmen für Hüfte, Schultern und Rumpf gehören dazu (komplette Routine in Kapitel 16).</li>
  </ul>

  <h2>Das richtige Gewicht</h2>
  <p>Hier machen die meisten einen von zwei Fehlern: Sie nehmen aus Ehrgeiz <strong>zu schwer</strong> – oder beim Swing aus Vorsicht <strong>zu leicht.</strong></p>
  <p>Der Swing lebt von der Hüfte. Ist die Kettlebell zu leicht, „hebst" du sie mit den Armen wie bei einem Frontheben und lernst die Bewegung falsch. Ein gewisses Gewicht <strong>zwingt</strong> dich in den Hip-Hinge. Übungen über Kopf oder mit langsamer Kraft (Press, Squat) startest du dagegen bewusst leichter. Deshalb mein Rat – und der Grund für die „zwei Kettlebells": <strong>eine leichtere</strong> für Press, Clean, Squat und zum Üben, <strong>eine schwerere</strong> für Swings.</p>
  <table class="wtab">
    <thead><tr><th>Ausgangslage</th><th>Swing / Hüfte</th><th>Press / Clean / Squat</th></tr></thead>
    <tbody>
      <tr><td>Einsteigerin (Frau)</td><td>8–12 kg</td><td>6–8 kg</td></tr>
      <tr><td>Einsteiger (Mann)</td><td>12–16 kg</td><td>8–12 kg</td></tr>
      <tr><td>Mit Sport-Background</td><td>16–20 kg</td><td>12–16 kg</td></tr>
    </tbody>
  </table>
  <p><strong>Woran du merkst, dass das Gewicht passt:</strong> Du schaffst die geplanten Wiederholungen mit <strong>sauberer</strong> Technik, die letzten zwei sind fordernd, aber die Form bleibt stabil. Zerfällt die Technik, ist es (noch) zu schwer. Fühlt sich der Swing an wie ein Armheben, ist es zu leicht. Wie du dich systematisch steigerst, kommt in Kapitel 15.</p>

  <h2>Häufige Fehler</h2>
  ${fehler('<strong>Zu schwer aus Ehrgeiz.</strong> Die Technik zerfällt, das Verletzungsrisiko steigt. Fix: Gewicht runter, bis die Bewegung sauber ist. Technik schlägt Ego – immer.')}
  ${fehler('<strong>Swing zu leicht.</strong> Aus der Übung wird ein Frontheben aus den Armen. Fix: So viel Gewicht, dass dich die Hüfte antreiben muss.')}
  ${fehler('<strong>Dauerhaft verkrampfter Griff.</strong> Unterarm brennt, Haut reißt. Fix: Nur so fest greifen wie nötig, zwischen den Sätzen lockern.')}

  <h2>Cues & Merksätze</h2>
  <ul class="cues">
    <li>„Griff locker wie ein Haken, nicht verkrampft wie eine Faust."</li>
    <li>„Handgelenk gerade – nie abgeknickt."</li>
    <li>„Technik bestimmt das Gewicht, nicht das Ego."</li>
    <li>„Freiraum rundum, im Zweifel loslassen."</li>
  </ul>
  <p class="closer">Damit steht <strong>Teil 1 – das Fundament.</strong> Ab hier bauen alle Übungen darauf auf. Weiter geht es mit Teil 2 und dem Herzstück: dem Swing.</p>
</section>`;

module.exports = { TOC, chapters: [K1, K2, K3, K4, K5] };
