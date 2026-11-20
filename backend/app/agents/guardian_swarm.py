import uuid
from typing import Dict, Any, List, Tuple, Optional
from datetime import datetime
from backend.app.models.schemas import (
    EnvironmentalTelemetry,
    WorkerProfile,
    AlertSeverity,
    LanguageEnum,
    HeatRiskAssessment,
    MultilingualAlertPayload
)
from backend.app.ml.heat_physics import HeatPhysicsEngine

class GuardianAgentSwarm:
    """
    Multi-Agent Operational Protection System:
    - Sentinel Agent: Triage and thermal strain evaluation
    - Clinical Protocol Agent: Work-rest prescriptions & emergency escalation
    - Dialect Synthesis Agent: 5-language voice alert & translation engine
    """

    # Dialect Dictionaries for Voice Synthesis and High-Contrast Text
    ALERTS_CATALOG: Dict[str, Dict[str, Any]] = {
        LanguageEnum.URDU: {
            AlertSeverity.GREEN: {
                "headline": "محفوظ حالت - عمومی نگہداشت",
                "body": "درجہ حرارت مستحکم ہے۔ معمول کے مطابق کام جاری رکھیں اور ہر گھنٹے بعد پانی پیئیں۔",
                "voice": "Aap ka darja hararat theek hai. Kaam jari rakhein aur paani peetay rahein.",
                "actions": ["ہر 60 منٹ بعد 250 ملی لیٹر پانی پیئیں", "عام رفتار سے کام جاری رکھیں"]
            },
            AlertSeverity.YELLOW: {
                "headline": "توجہ فرمائیں - گرمی کا اثر شروع",
                "body": "گرمی بڑھ رہی ہے۔ پانی پینے کی مقدار بڑھائیں اور دھوپ میں مسلسل کھڑے ہونے سے گریز کریں۔",
                "voice": "Garmi barh rahi hai. Zyada paani piyein aur dhoop se bachein.",
                "actions": ["ہر گھنٹے 500 ملی لیٹر پانی یا او آر ایس پیئیں", "سر کو ڈھانپ کر رکھیں"]
            },
            AlertSeverity.AMBER: {
                "headline": "وارننگ! جسم کا درجہ حرارت بڑھ رہا ہے",
                "body": "آپ کے جسم میں گرمی جمع ہو رہی ہے۔ براہ کرم فوری طور پر 15 منٹ کے لیے سائے میں جائیں۔",
                "voice": "Khabardaar! Aap ka jism garam ho raha hai. Barah-e-karam 15 minute ke liye saaye mein aaraam karein aur paani piyein.",
                "actions": ["فوری 15 منٹ سائے دار کیبن میں آرام کریں", "ٹھنڈا پانی پیئیں اور چہرہ دھوئیں", "ہیلمٹ عارضی طور پر اتاریں"]
            },
            AlertSeverity.RED: {
                "headline": "خطرہ! شدید گرمی کا خطرہ",
                "body": "گرمی کے شدید تناؤ کا خطرہ! بھاری مشقت بند کریں اور اپنے سپروائزر کو مطلع کریں۔",
                "voice": "Khatra! Shadeed garmi ka khatra. Bhaari kaam rokein aur foran saaye mein baith jayein.",
                "actions": ["بھاری کام فوری بند کریں", "کم از کم 25 منٹ ٹھنڈے کمرے میں بیٹھیں", "ساتھی کارکن یا سپروائزر کو مطلع کریں"]
            },
            AlertSeverity.EMERGENCY: {
                "headline": "ایمرجنسی! ہیٹ اسٹروک کا خدشہ",
                "body": "فوری طبی امداد طلب کریں! کارکن کو فوری ٹھنڈی جگہ منتقل کریں اور برف یا گیلے کپڑے لگائیں۔",
                "voice": "Emergency! Foran madad talab karein. Doctor ko bulayein.",
                "actions": ["فوری سائیٹ میڈیکل کلینک کال کریں", "گردن اور بغلوں پر ٹھنڈا پانی یا برف لگائیں", "پیر اوپر اٹھا کر لٹائیں"]
            }
        },
        LanguageEnum.HINDI: {
            AlertSeverity.GREEN: {
                "headline": "सुरक्षित स्थिति - सामान्य दिनचर्या",
                "body": "तापमान सामान्य है। हाइड्रेटेड रहें और अपना काम जारी रखें।",
                "voice": "Aapka taapmaan theek hai. Kaam jaari rakhein aur paani peete rahein.",
                "actions": ["प्रत्येक घंटे 250 मिली पानी पिएं", "सुरक्षा हेलमेट पहने रखें"]
            },
            AlertSeverity.YELLOW: {
                "headline": "सावधानी - धूप और गर्मी बढ़ रही है",
                "body": "गर्मी का प्रभाव बढ़ रहा है। अधिक पानी पिएं और चक्कर आने पर तुरंत बैठें।",
                "voice": "Garmi barh rahi hai. Thanda paani piyein aur savdhaan rahein.",
                "actions": ["प्रति घंटे 500 मिली पानी या ओआरएस पिएं", "छांव में संक्षिप्त विराम लें"]
            },
            AlertSeverity.AMBER: {
                "headline": "चेतावनी! शरीर का तापमान बढ़ रहा है",
                "body": "हीट स्ट्रेन का खतरा बढ़ रहा है। कृपया 15 मिनट के लिए छांव में जाएं और ठंडा पानी पिएं।",
                "voice": "Savdhaan! Shareer ka taapmaan badh raha hai. Kripya 15 minute ke liye chhaanv mein aaraam karein.",
                "actions": ["15 मिनट अनिवार्य रूप से छांव में आराम करें", "ठंडा पानी पिएं और चेहरे पर पानी छिड़कें", "भारी वजन न उठाएं"]
            },
            AlertSeverity.RED: {
                "headline": "खतरा! अत्यधिक हीट स्ट्रेस",
                "body": "गर्मी का स्तर खतरनाक है! भारी काम तुरंत रोकें और विश्राम क्षेत्र में जाएं।",
                "voice": "Khatra! Bhaari kaam turant rokein aur aaraam karein.",
                "actions": ["भारी काम तुरंत रोकें", "वातानुकूलित कूलिंग रूम में 25 मिनट बैठें", "सुपरवाइजर को सूचित करें"]
            },
            AlertSeverity.EMERGENCY: {
                "headline": "आपातकाल! हीट स्ट्रोक की संभावना",
                "body": "तत्काल चिकित्सा सहायता आवश्यक है! मेडिकल टीम को बुलाएं और शरीर को तुरंत ठंडा करें।",
                "voice": "Aapaatkaal! Medical team ko turant bulayein.",
                "actions": ["साइट डॉक्टर/एंबुलेंस को कॉल करें", "सिर और गर्दन पर ठंडा गीला तौलिया रखें", "छांव में लिटाएं"]
            }
        },
        LanguageEnum.TAGALOG: {
            AlertSeverity.GREEN: {
                "headline": "Ligtas na Kalagayan - Ipagpatuloy ang Trabaho",
                "body": "Normal ang temperatura ng katawan. Uminom ng tubig bawat oras.",
                "voice": "Ligtas ang iyong temperatura. Magpatuloy sa trabaho at laging uminom ng tubig.",
                "actions": ["Uminom ng 250ml ng tubig bawat oras", "Panatilihin ang karaniwang bilis"]
            },
            AlertSeverity.YELLOW: {
                "headline": "Pag-iingat - Tumataas ang Init",
                "body": "Tumataas ang temperatura sa labas. Dagdagan ang pag-inom ng tubig.",
                "voice": "Paalala, umiinit ang panahon. Uminom ng mas maraming tubig.",
                "actions": ["Uminom ng 500ml ng tubig o electrolyte", "Magsuot ng proteksyon sa araw"]
            },
            AlertSeverity.AMBER: {
                "headline": "Babala! Tumataas ang Init ng Katawan",
                "body": "Mabilis na tumataas ang init ng iyong katawan. Magpahinga sa lilim ng 15 minuto.",
                "voice": "Babala! Tumataas ang init ng iyong katawan. Magpahinga sa lilim ng labing-limang minuto.",
                "actions": ["Pumunta sa may lilim na cooling area ng 15 minuto", "Uminom ng malamig na tubig", "Alisin pansamantala ang helmet"]
            },
            AlertSeverity.RED: {
                "headline": "Panganib! Matinding Heat Stress",
                "body": "Nasa mapanganib na antas ang init. Ihinto ang mabigat na trabaho ngayon din.",
                "voice": "Panganib! Itigil ang mabigat na trabaho at magpahinga agad sa malamig na lugar.",
                "actions": ["Ihinto ang mabibigat na pagbubuhat", "Manatili sa AC room ng 25 minuto", "Sabihan ang supervisor"]
            },
            AlertSeverity.EMERGENCY: {
                "headline": "Emergency! Posibleng Heat Stroke",
                "body": "Kailangan ng agarang medikal na tulong! Tumawag ng emergency response team.",
                "voice": "Emergency! Tumawag ng ambulansya o medic ngayon din.",
                "actions": ["Tumawag agad sa on-site medical team", "Lagyan ng yelo o basang tela ang leeg", "Itaas ang mga binti"]
            }
        },
        LanguageEnum.BENGALI: {
            AlertSeverity.GREEN: {
                "headline": "নিরাপদ অবস্থা - স্বাভাবিক কাজ",
                "body": "শরীরের তাপমাত্রা স্বাভাবিক আছে। প্রচুর পানি পান করুন এবং কাজ চালিয়ে যান।",
                "voice": "Aapnar sharirer taapmaatra thik aache. Paani khaan o kaaj chalaye jaan.",
                "actions": ["প্রতি ঘণ্টায় ২৫০ মিলি জল পান করুন", "স্বাভাবিক গতি বজায় রাখুন"]
            },
            AlertSeverity.YELLOW: {
                "headline": "সতর্কতা - গরম বাড়ছে",
                "body": "বাইরের তাপমাত্রা বাড়ছে। আরও বেশি পানি পান করুন এবং বিশ্রামের সুযোগ নিন।",
                "voice": "Garom baarchhe. Beshi kore jol khaan o sabdhaan thakun.",
                "actions": ["প্রতি ঘণ্টায় ৫০০ মিলি জল বা স্যালাইন পান করুন", "মাথা ঢেকে রাখুন"]
            },
            AlertSeverity.AMBER: {
                "headline": "ওয়ার্নিং! শরীরের তাপমাত্রা বিপজ্জনক হচ্ছে",
                "body": "আপনার শরীরে অতিরিক্ত তাপ জমছে। অবিলম্বে ১৫ মিনিটের জন্য ছায়ায় বিশ্রাম নিন।",
                "voice": "Sabdhaan! Sharir gorom hoye jachhe. Doya kore 15 minute chhayay bishram nin.",
                "actions": ["অবিলম্বে ১৫ মিনিট ছায়াযুক্ত স্থানে বিশ্রাম নিন", "ঠান্ডা জল পান করুন ও মুখে জল দিন", "ভারী কাজ কমিয়ে দিন"]
            },
            AlertSeverity.RED: {
                "headline": "বিপদ! মারাত্মক হিট স্ট্রেস",
                "body": "মারাত্মক তাপীয় চাপ! ভারী কাজ এখনই বন্ধ করুন এবং কুলিং জোনে যান।",
                "voice": "Bipod! Bhaari kaaj thamaano hok ebong thanda jaygay jaan.",
                "actions": ["সব ধরনের ভারী কাজ বন্ধ রাখুন", "কমপক্ষে ২৫ মিনিট বিশ্রামে থাকুন", "সুপারভাইজারকে অবিলম্বে জানান"]
            },
            AlertSeverity.EMERGENCY: {
                "headline": "জরুরি অবস্থা! হিট স্ট্রোকের আশঙ্কা",
                "body": "জরুরি মেডিকেল সহায়তা প্রয়োজন! দ্রুত মেডিকেল টিম ডাকুন।",
                "voice": "Emergency! Daktar ebong ambulance daakun.",
                "actions": ["জরুরি চিকিৎসা কেন্দ্রে ফোন করুন", "ঘাড়ে ও মাথায় ঠান্ডা জল বা বরফ দিন", "বাতাস করুন"]
            }
        },
        LanguageEnum.ARABIC: {
            AlertSeverity.GREEN: {
                "headline": "حالة آمنة - متابعة العمل الطبيعي",
                "body": "درجة حرارة الجسم ضمن المعدل الطبيعي. استمر في شرب الماء بانتظام.",
                "voice": "درجة حرارتك طبيعية. تابع العمل واحرص على شرب الماء.",
                "actions": ["شرب 250 مل ماء كل ساعة", "ارتداء واقي الرأس"]
            },
            AlertSeverity.YELLOW: {
                "headline": "تنبيه - ارتفاع درجات الحرارة",
                "body": "حرارة الجو في تصاعد. زد من وتيرة شرب السوائل وخذ فترات راحة قصيرة.",
                "voice": "الحرارة ترتفع. اشرب المزيد من الماء واسترح في الظل.",
                "actions": ["شرب 500 مل ماء أو أملاح تعويضية", "تجنب التعرض المباشر لأشعة الشمس"]
            },
            AlertSeverity.AMBER: {
                "headline": "تحذير! تراكم الإجهاد الحراري",
                "body": "حرارة جسمك ترتفع بسرعة. يُرجى التوجه فوراً إلى منطقة الظل والاستراحة لمدة 15 دقيقة.",
                "voice": "تحذير! حرارة جسمك ترتفع. توجه إلى الظل واسترح 15 دقيقة واشرب الماء.",
                "actions": ["استراحة إلزامية لمدة 15 دقيقة في منطقة التبريد", "شرب ماء بارد وترطيب الوجه", "تخفيف الجهد العضلي"]
            },
            AlertSeverity.RED: {
                "headline": "خطر! إجهاد حراري شديد",
                "body": "مستوى الخطر مرتفع جداً! أوقف العمل الشاق فوراً وانتقل إلى غرفة التكييف.",
                "voice": "خطر! أوقف العمل الشاق فوراً وتوجه لغرفة التبريد.",
                "actions": ["إيقاف العمل البدني فوراً", "البقاء في منطقة مكيفة لمدة 25 دقيقة", "إبلاغ مشرف السلامة"]
            },
            AlertSeverity.EMERGENCY: {
                "headline": "طوارئ! اشتباه بضربة شمس",
                "body": "حالة طارئة تتطلب تدخلاً طبياً فورياً! استدعاء المسعفين وتبريد المصاب بالماء والثلج.",
                "voice": "طوارئ! استدعاء الفريق الطبي فوراً.",
                "actions": ["طلب الإسعاف وعيادة الموقع فوراً", "وضع كمادات باردة أو ثلج على العنق والإبطين", "رفع القدمين للأعلى"]
            }
        },
        LanguageEnum.ENGLISH: {
            AlertSeverity.GREEN: {
                "headline": "Safe Status - Routine Maintenance",
                "body": "Body temperature is nominal. Continue hydration protocol and scheduled tasks.",
                "voice": "Thermal status normal. Maintain hydration and continue work.",
                "actions": ["Drink 250ml water every hour", "Wear PPE and stay alert"]
            },
            AlertSeverity.YELLOW: {
                "headline": "Caution - Ambient Heat Rising",
                "body": "Rising environmental heat index. Increase hydration rate and take scheduled breaks.",
                "voice": "Caution, ambient heat is rising. Drink water and watch for fatigue.",
                "actions": ["Drink 500ml water or electrolytes per hour", "Seek shade during brief breaks"]
            },
            AlertSeverity.AMBER: {
                "headline": "Warning! Rising Heat Strain",
                "body": "Internal thermal load is accumulating. Mandatory 15-minute shaded rest required.",
                "voice": "Warning! Body heat is rising. Move to shade for a 15-minute rest and drink cool water.",
                "actions": ["Mandatory 15-min shaded cooling break", "Drink cool electrolyte water", "Loosen heavy protective layers"]
            },
            AlertSeverity.RED: {
                "headline": "Danger! Severe Heat Strain Risk",
                "body": "High risk of heat exhaustion. Cease heavy exertion immediately and proceed to cooling room.",
                "voice": "Danger! Severe heat strain. Stop heavy work immediately and report to supervisor.",
                "actions": ["Halt heavy labor immediately", "Rest 25 mins in air-conditioned room", "Notify safety supervisor"]
            },
            AlertSeverity.EMERGENCY: {
                "headline": "Emergency! Potential Heat Stroke",
                "body": "Critical medical emergency. Immediate clinical intervention required.",
                "voice": "Emergency! Heat stroke alert. Call medical team immediately.",
                "actions": ["Dispatch site medical team immediately", "Apply ice or cold water packs to neck and armpits", "Elevate legs and fan worker"]
            }
        }
    }

    @classmethod
    def process_and_synthesize(
        cls,
        telemetry: EnvironmentalTelemetry,
        worker: WorkerProfile,
        language_override: Optional[LanguageEnum] = None
    ) -> Tuple[HeatRiskAssessment, MultilingualAlertPayload]:
        """
        Coordinates the multi-agent guardian pipeline:
        1. Sentinel: Evaluates physical strain & produces risk assessment with XAI
        2. Synthesizer: Maps language & severity to dialect voice scripts
        """
        eval_result = HeatPhysicsEngine.evaluate_worker_strain(telemetry, worker)

        assessment = HeatRiskAssessment(
            assessment_id=f"ASSESS-{uuid.uuid4().hex[:8].upper()}",
            worker_id=worker.worker_id,
            timestamp=datetime.utcnow(),
            severity=eval_result["severity"],
            overall_risk_score=eval_result["risk_score"],
            predicted_core_temp_c=eval_result["predicted_core_temp_c"],
            sweat_rate_liters_per_hr=eval_result["sweat_rate_l_hr"],
            max_allowable_continuous_work_mins=eval_result["allowable_work_mins"],
            required_rest_in_shade_mins=eval_result["required_rest_mins"],
            recommended_water_intake_ml_hr=eval_result["water_ml_hr"],
            lead_time_minutes_before_heat_strain=eval_result["lead_time_mins"],
            xai_breakdown=eval_result["xai_breakdown"],
            primary_risk_driver=eval_result["primary_driver"]
        )

        # Determine target language (or override)
        effective_lang = language_override or worker.preferred_language
        lang_catalog = cls.ALERTS_CATALOG.get(effective_lang, cls.ALERTS_CATALOG[LanguageEnum.ENGLISH])
        content = lang_catalog.get(assessment.severity, lang_catalog[AlertSeverity.GREEN])

        # English reference translation
        en_catalog = cls.ALERTS_CATALOG[LanguageEnum.ENGLISH]
        en_content = en_catalog.get(assessment.severity, en_catalog[AlertSeverity.GREEN])

        alert = MultilingualAlertPayload(
            alert_id=f"ALERT-{uuid.uuid4().hex[:8].upper()}",
            worker_id=worker.worker_id,
            severity=assessment.severity,
            language=effective_lang,
            voice_script_phonetic=content["voice"],
            localized_headline=content["headline"],
            localized_body_text=content["body"],
            localized_action_instructions=content["actions"],
            english_headline=en_content["headline"],
            english_body_text=en_content["body"],
            english_action_instructions=en_content["actions"],
            created_at=datetime.utcnow(),
            acknowledged=False
        )

        return assessment, alert
