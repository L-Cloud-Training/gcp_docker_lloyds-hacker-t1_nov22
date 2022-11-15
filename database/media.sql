--
-- PostgreSQL database dump
--

-- Dumped from database version 11.11
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: media; Type: TABLE; Schema: public; Owner: totipu
--

CREATE TABLE public.media (
    id integer NOT NULL,
    url character varying NOT NULL
);


-- ALTER TABLE public.media OWNER TO totipu;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: totipu
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


-- ALTER TABLE public.media_id_seq OWNER TO totipu;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: totipu
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: totipu
--

COPY public.media (id, url) FROM stdin;
1	https://storage.googleapis.com/sharecaremedia/images/charity1.png
2	https://storage.googleapis.com/sharecaremedia/images/charity2.jpeg
3	https://storage.googleapis.com/sharecaremedia/images/charity3.png
4	https://storage.googleapis.com/sharecaremedia/images/charity4.png
5	https://storage.googleapis.com/sharecaremedia/images/charity5.png
6	https://storage.googleapis.com/sharecaremedia/images/charity6.png
\.


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: totipu
--

SELECT pg_catalog.setval('public.media_id_seq', 6, true);


--
-- Name: media PK_f4e0fcac36e050de337b670d8bd; Type: CONSTRAINT; Schema: public; Owner: totipu
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

